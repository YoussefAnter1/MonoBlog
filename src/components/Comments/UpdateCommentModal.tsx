"use client";
import { DOMAIN } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

interface UpdateCommentModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number;
}
const UpdateCommentModal = ({
  setOpen,
  text,
  commentId,
}: UpdateCommentModalProps) => {
  const [updatedText, setUpdatedText] = useState(text);
  const router = useRouter();
  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updatedText.trim() === "") return toast.info("Please write something");
    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text: updatedText,
      });
      router.refresh();
      setUpdatedText("");
      setOpen(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="w-10/12 lg:w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative">
        {/* Close Button */}
        <IoMdCloseCircleOutline
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 cursor-pointer text-3xl transition"
        />

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Edit Comment
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            type="text"
            placeholder="Edit your comment..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg transition"
          />

          <button
            type="submit"
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-lg font-medium transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
