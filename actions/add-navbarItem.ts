"use server";

import { prismadb } from "@/lib/prismadb";
import { navbarItem } from "@prisma/client";

export const addNavbarItem = async ({ data }: { data: navbarItem }) => {
  if (!data) {
    return { message: "لطفا تمامی فیلد ها را تکمیل نمایید" };
  }

  await prismadb.navbarItem.create({
    data,
  });

  return { message: "عنوان مورد نظر با موفقیت اضافه گردید" };
};
