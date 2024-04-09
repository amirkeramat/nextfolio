import { AdminPage } from "@/components/admin/admin-page";
import { RoleGate } from "@/components/auth/role-gate";
import { SuperAdminPage } from "@/components/super-admin/superAdmin-page";
import { currentRole } from "@/lib/auth";

const DashboardPage = async () => {
  const role = await currentRole();
  if (role === "ADMIN")
    return (
      <RoleGate allowedRole="ADMIN">
        <AdminPage />
      </RoleGate>
    );
  if (role === "SUPER_ADMIN")
    return (
      <RoleGate allowedRole="SUPER_ADMIN">
        <SuperAdminPage />
      </RoleGate>
    );
};

export default DashboardPage;
