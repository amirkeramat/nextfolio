import { currentRole } from "@/lib/auth";
import { Role } from "@prisma/client";
import { FormError } from "./form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export const RoleGate = async ({ children, allowedRole }: RoleGateProps) => {
  const role = await currentRole();

  if (role !== allowedRole) {
    return <FormError message="شما به این بخش دسترسی ندارید" />;
  }

  return <>{children}</>;
};
