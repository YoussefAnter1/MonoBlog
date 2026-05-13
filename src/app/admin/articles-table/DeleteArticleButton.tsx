"use client";
import { DOMAIN } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface DeleteArticleButton {
  articleId: number;
}

const DeleteArticleHandler = ({ articleId }: DeleteArticleButton) => {
  const router = useRouter();
  const deleteArticleHandler = async () => {
    try {
      if (confirm("you want delete this article, Are you sure?")) {
        await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
        router.refresh();
        toast.success("article delete");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div
      onClick={deleteArticleHandler}
      className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition"
    >
      Delete
    </div>
  );
};

export default DeleteArticleHandler;
