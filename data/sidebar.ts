import { prismadb } from "@/lib/prismadb";
import { Role } from "@prisma/client";

export const getSidebarItemsByRole = async (role: Role) => {
  if (!role) return [];
  try {
    const sidebarItems = await prismadb.sidebarItems.findMany({
      where: {
        sidebarItems: {
          some: {
            role,
          },
        },
      },
    });
    return sidebarItems;
  } catch (error) {
    return [];
  }
};
