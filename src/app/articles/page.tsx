import { getArticles } from "@/apiCalls/articlesApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { prisma } from "@/utils/prisma";
// import { Article } from "@/generated/prisma/client";
// import { Article } from "@/utils/types";
import { Article } from "@prisma/client";
interface ArticlesPageProps {
  // searchParams:{pageNumber :string}
  searchParams: Promise<{ pageNumber: string }>;
}

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  const { pageNumber } = await searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count()
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  return (
    <section className="fix-height container m-auto px-5">
      <SearchArticleInput />
      <div className="flex gap-2 flex-wrap items-center justify-center">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        route="/articles"
        pages={pages}
      />
    </section>
  );
};

export default ArticlesPage;
