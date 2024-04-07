import React from "react";
import AdminPage from "./admin/page";

const page = ({ params }: { params: { role: string } }) => {
  if (params.role === "admin") {
    return <AdminPage />;
  }
};

export default page;
