"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { CardWrapper } from "../auth/card-wrapper";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddSidebarSchema } from "@/schemas";

export const AddSidebarForm = () => {
  const form = useForm<z.infer<typeof AddSidebarSchema>>({
    resolver: zodResolver(AddSidebarSchema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <div className="flex justify-center items-center">
      <CardWrapper
        headerLabel="افزودن منو"
        backButtonHref="/dashboard"
        backButtonLabel="بازگشت به پنل داشبورد"
      >
        <Form {...form}>
          <form action=""></form>
        </Form>
      </CardWrapper>
    </div>
  );
};
