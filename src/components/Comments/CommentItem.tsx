"use client";
// import { FadEdit, FadTrash } from "react-icons/fa";
import { CommentWithUser } from "@/utils/types";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";
interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
}
const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const commentDeleteHandler = async () => {
    try {
      if (confirm("you want delete this comment, Are you sure"))
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
      router.refresh();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {comment.user.username}
        </strong>
        <span className="bg-yellow-700 px-1 rounded-lg text-white">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <p className="flex justify-start items-center">{comment.text}</p>
      {userId && userId === comment.userId && (
        <div className="flex justify-end items-center">
          <FaRegEdit
            onClick={() => setOpen(true)}
            className="text-green-600 text-xl cursor-pointer me-3"
          />
          <FaTrash onClick={commentDeleteHandler} className="text-red-600 text-xl cursor-pointer " />
        </div>
      )}
      {open && (
        <UpdateCommentModal
          setOpen={setOpen}
          text={comment.text}
          commentId={comment.id}
        />
      )}
    </div>
  );
};

export default CommentItem;
