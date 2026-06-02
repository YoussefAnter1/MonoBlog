import React from "react";
import AdminSidebar from "./AdminSidebar";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { redirect } from "next/navigation";
interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}
const AdminDashboardLayout =async ({ children }: AdminDashboardLayoutProps) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value || "";
    const payload = verifyTokenForPage(token);
    if (payload?.isAdmin === false) redirect("/");
  return (
    <div className="overflow-height flex items-start justify-between overflow-hidden">
      <div className="overflow-height w-15 lg:w-1/5 bg-purple-600 text-white p-1 lg:p-5">
        <AdminSidebar />
      </div>
      <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">{children}</div>
    </div>
  );
};

export default AdminDashboardLayout;
