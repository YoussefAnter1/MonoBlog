import RegisterForm from "./RegisterForm";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

const RegisterPage = async () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("jwtToken")?.value || "";
  // if (token) redirect("/");

  return (
    <section className="fix-height container px-7 m-auto flex items-center justify-center">
      <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3">
        <h1 className="font-bold text-3xl text-gray-800 mb-5">
          Create New Account
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
