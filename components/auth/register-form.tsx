"use client";
import React, { useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/schemas";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { loginStore } from "./store";
import { register } from "@/actions/register";
export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const {
    error,
    setError,
    success,
    setSuccess,
    showPass,
    setShowPass,
    showConfirmPass,
    setShowConfirmPass,
  } = loginStore((state) => state);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel={"ساخت حساب کاربری"}
      backButtonLabel={"حساب کاربری دارید"}
      backButtonHref={"/auth/login"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="نام خود را وارد نمایید"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام کاربری</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="نام کاربری شما" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ایمل</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="ایمل خود را وارد نمایید"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPass ? "text" : "password"}
                      placeholder="رمز عبور خود را وارد نمایید"
                      {...field}
                    />
                    <button
                      className="absolute left-2 top-3"
                      type="button"
                      onClick={() =>
                        showPass ? setShowPass(false) : setShowPass(true)
                      }
                    >
                      {showPass ? <BsEye /> : <BsEyeSlash />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تکرار رمز عبور</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPass ? "text" : "password"}
                      placeholder="تکرار رمز عبور"
                      {...field}
                    />
                    <button
                      className="absolute left-2 top-3"
                      type="button"
                      onClick={() =>
                        showConfirmPass
                          ? setShowConfirmPass(false)
                          : setShowConfirmPass(true)
                      }
                    >
                      {showConfirmPass ? <BsEye /> : <BsEyeSlash />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            ثبت نام
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
