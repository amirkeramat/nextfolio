import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  // await resend.emails.send({
  //   from: "amirkaramat75@gmail.com",
  //   to: email,
  //   subject: "لینک تایید ایمیل شما",
  //   html: `<p>اینجا<a href="${confirmLink}">تایید ایمل</a>کلیک کنید.</p>`,
  // });
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "hello world",
    text: "it works!",
    headers: {
      "X-Entity-Ref-ID": "123456789",
    },
    tags: [
      {
        name: "category",
        value: "confirm_email",
      },
    ],
  });
};
