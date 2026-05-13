import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";
import { Article } from "@prisma/client";

// Get Articles Based On PageNumber
export async function getArticles(
  pageNumber: string | undefined,
): Promise<Article[]> {
  // const response = await fetch("https://dumyjson.com/posts");
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // const response = await fetch("https://dummyjson.com/posts");
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
    { cache: "no-store" },
  );
  const data = await response.json();
  // console.log("this is the",data);
  if (!response.ok) {
    throw new Error("failed1");
  }
  return data;
}

// Get Articles Count
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`, {
    cache: "no-store",
  });
  const data = await response.json();
  // console.log("this is the",data);
  if (!response.ok) {
    throw new Error("failed1");
  }
  const { count } = data as { count: number };
  return count;
}

// Get Articles Based On SearchText
export async function getArticlesBasedOnSearch(
  searchText: string,
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles/search?searchText=${searchText}`,
  );
  const data = await response.json();
  // console.log("this is the",data);
  if (!response.ok) {
    throw new Error("failed1");
  }
  return data;
}

// Get Single Articles By Id
export async function getSingleArticle(
  articleId: string,
): Promise<SingleArticle> {
  // const { id } = await params; // هنا بنفك الـ Promise
  const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }
  return response.json();
}
