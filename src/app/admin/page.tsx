import { cookies } from "next/headers";
import AddArticlesForm from "./AddArticlesForm";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { redirect } from "next/navigation";

async function Admin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");
  return (
    <div className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
          Add New Article
        </h2>
        <AddArticlesForm />
      </div>
    </div>
  );
}

export default Admin;
