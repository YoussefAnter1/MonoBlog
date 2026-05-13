import { DOMAIN } from "@/utils/constants";
import { Comment } from "@prisma/client";

const getAllComments = async (token: string): Promise<Comment[]> => {
  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return response.json();
};

export default getAllComments;
