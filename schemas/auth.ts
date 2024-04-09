import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "وارد کردن ایمل ضروری میباشد",
  }),
  password: z.string().min(1, { message: "رمز عبور نا معتبر است" }),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "وارد کردن نام ضروری می باشد" }),
    userName: z
      .string()
      .min(1, { message: "وارد کردن نام کابری ضروری می باشد" }),
    email: z.string().email({ message: "ایمیل ضروری می باشد" }),
    password: z.string().regex(/(?=.*\d)(?=.*[A-Z]).{8,}/, {
      message: `
      حداقل یک عدد,
      حداقل یک حرف بزرگ,
      حداقل یک کاراکتر,
      حداقل 8 حرف باشد
    `,
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "تکرار رمز عبور ضروری می باشد" }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: "رمز عبور مطابقت ندارد", path: ["confirmPassword"] }
  );
