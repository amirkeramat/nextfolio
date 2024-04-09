import { RoleGate } from "@/components/auth/role-gate";
import { AddSidebarForm } from "@/components/super-admin/add-sidebarForm";
import React from "react";

const AddSidebarPage = () => {
  return (
    <RoleGate allowedRole="SUPER_ADMIN">
      <AddSidebarForm />
    </RoleGate>
  );
};

export default AddSidebarPage;
