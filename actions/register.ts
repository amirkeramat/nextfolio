"use server";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { registerSchema } from "@/schemas";
import { prismadb } from "@/lib/prismadb";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message };
  }

  const { name, userName, password, confirmPassword, email } =
    validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 12);
  const isPasswordConfirmed = password === confirmPassword;

  if (!isPasswordConfirmed) return { error: "رمز عبور مطابقت ندارد" };

  const isUserExisted = await getUserByEmail(email);

  if (isUserExisted) return { error: "قبلا با این ایمیل ثبت نام کرده اید" };

  await prismadb.user.create({
    data: {
      name,
      hashedPassword,
      email,
      userName,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "ثبت نام با موفقیت انحام شد" };
};
