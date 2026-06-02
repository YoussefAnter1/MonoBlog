"use client";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push("/");
      router.refresh();
    } catch {
      toast.warning("Something went wrong");
    }
  };
  return (
    <button
      onClick={logoutHandler}
      className="bg-gray-700 text-gray-200 px-1 rounded text-xl"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
