"use client";
import { DOMAIN } from "@/utils/constants";
import { Article } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
interface EditArticleFormProps {
  article: Article;
}
const EditArticlesForm = ({ article }: EditArticleFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const formSubmitHandler = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");

    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, { title, description });
      toast.success("article updated");
      router.refresh();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    // <form onSubmit={(e: SubmitEvent<HTMLFormElement>)=> {
    <form onSubmit={formSubmitHandler} className="flex flex-col">
      <input
        className="mb-4 border rounded p-2 text-xl bg-white border-none"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="mb-4 p-2 lg:text-xl rounded resize-none bg-white"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="text-2xl text-white bg-green-700 hover:bg-green-900  p-2 rounded-lg font-bold"
      >
        Edit
      </button>
    </form>
  );
};

export default EditArticlesForm;
