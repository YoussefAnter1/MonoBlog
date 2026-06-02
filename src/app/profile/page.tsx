import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";

const ProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);

  if (!payload) {
    redirect("/login");
  }

  return (
    <section className="min-h-[calc(100vh-200px)] bg-gray-50 py-10">
      <div className="container mx-auto max-w-4xl px-5">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Profile Settings
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your account information and security settings.
          </p>
        </div>

        <div className="rounded-xl bg-white shadow-md border border-gray-200 p-6 md:p-8">
          <ProfileForm userId={payload.id} />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;