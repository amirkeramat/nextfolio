"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "ایمیل و پسورد نا معتبر می باشد" };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
    return { error: "مشخصات وارد شده صحیح نمی باشد" };
  }

  if (!existingUser.verified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    // await sendVerificationEmail(
    //   verificationToken.email,
    //   verificationToken.token
    // );

    return {
      success: "ایمیل شما نیاز به تایید دارد لینک تایید به ایمیل شما ارسال شد.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "با موفقیت وارد شدید" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "ایمیل یا رمز عبور اشتباه می باشد" };

        default:
          return { error: "مشکلی پیش آمده است دوباره امتحان کنید" };
      }
    }
    throw error;
  }
};
