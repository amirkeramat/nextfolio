import { getSidebarItemsByRole } from "@/data/sidebar";
import { currentRole } from "@/lib/auth";
import Link from "next/link";

export const Sidebar = async () => {
  const role = await currentRole();

  const sidebarItems = await getSidebarItemsByRole(role);

  return (
    <div className="w-[200px] h-full bg-white flex flex-col space-y-4">
      {sidebarItems && (
        <>
          {sidebarItems.map((item: any) => (
            <Link href={item.href} key={item.id}>
              {item.title}
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
