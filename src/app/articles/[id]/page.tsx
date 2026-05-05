import { getSingleArticle } from "@/apiCalls/articlesApiCall";
import AddCommentForm from "@/components/Comments/AddCommentForm";
import CommentItem from "@/components/Comments/CommentItem";
import { SingleArticle } from "@/utils/types";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";

interface SingleArticleProps {
  //   params: { id: string };
  params: Promise<{ id: string }>;
}
const SingleArticlePage = async ({ params }: SingleArticleProps) => {
  const { id } = await params; // هنا بنفك الـ Promise
 const cookieStore = await cookies();
const token = cookieStore.get("jwtToken")?.value || "";
const payload = verifyTokenForPage(token);
  // const response = await fetch(`https://dummyjson.com/posts/${id}`);

  const article: SingleArticle = await getSingleArticle(id);
  // console.log("This is response", response);
  // console.log("This is article", article.title);

  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className="bg-white p-7 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">
          {article.title}
        </h1>
        <div className="text-gray-400">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p className="text-gray-800 text-xl mt-5">{article.description}</p>
      </div>
      {payload ? (
        <AddCommentForm articleId={article.id} />
      ) : (
        <p className="text-blue-600 md:text-2xl">
          to write a comment you should log in first
        </p>
      )}
      <h4 className="text-xl text-green-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      {article.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default SingleArticlePage;
