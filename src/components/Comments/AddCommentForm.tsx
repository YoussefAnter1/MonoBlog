"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";
interface AddCommentFormProps {
  articleId: number;
}
const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const [text, setText] = useState("");
  const formSubmitHandler = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (text === "") return toast.error("Please write something");
    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      router.refresh();
      toast.success("comment added");
      setText("");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    // <form onSubmit={(e: SubmitEvent<HTMLFormElement>)=> {
    <form onSubmit={formSubmitHandler} className="my-5">
      <input
        className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md"
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-700 text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition"
      >
        Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
