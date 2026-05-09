import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { redirect } from "next/navigation";
const AdminCommentsTable = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");
  return <div>AdminCommentsTable</div>;
};

export default AdminCommentsTable;
