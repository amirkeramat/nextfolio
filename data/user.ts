import { prismadb } from "@/lib/prismadb";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const createUser = async (data: User) => {
  await prismadb.user.create({
    data,
  });
};
