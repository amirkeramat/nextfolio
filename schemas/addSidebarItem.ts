import * as z from "zod";

export const AddSidebarSchema = z.object({
  title: z.string().min(3, { message: "عنوان ضروری می باشد" }),
});
