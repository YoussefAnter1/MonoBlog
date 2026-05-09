"use client";
import { DOMAIN } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
const AddArticlesForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const formSubmitHandler = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");

    try {
      await axios.post(`${DOMAIN}/api/articles`, { title, description });
      setTitle("");
      setDescription("");
      toast.success("New article added");
      router.refresh();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }

    // console.log(email, password);
  };
  return (
    // <form onSubmit={(e: SubmitEvent<HTMLFormElement>)=> {
    <form onSubmit={formSubmitHandler} className="flex flex-col">
      <input
        className="mb-4 border rounded p-2 text-xl bg-white border-none"
        type="text"
        placeholder="Enter Your Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="mb-4 p-2 lg:text-xl rounded resize-none bg-white"
        rows={5}
        placeholder="Enter Articles Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="text-2xl text-white bg-blue-700 hover:bg-blue-900  p-2 rounded-lg font-bold"
      >
        Add
      </button>
    </form>
  );
};

export default AddArticlesForm;
