import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { redirect } from "next/navigation";
const AdminArticlesTable = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");
  return <div>AdminArticlesTable</div>;
};

export default AdminArticlesTable;
