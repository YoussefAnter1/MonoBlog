import Link from "next/link";
import React from "react";

// const pages = [1, 2, 3, 4, 5];
interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}
const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
  const pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);
  const prevPage = pageNumber - 1;
  const nextPage = pageNumber + 1;
  return (
    <div className="flex justify-center items-center mt-2 mb-10">
      {pageNumber !== 1 && (
        <Link
          // href={`${route}?pageNumber=${prevPage}`}
          href={{
            pathname: route,
            query: { pageNumber: prevPage },
          }}
          className="py-1 px-3 border border-gray-700 font-bold text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          Prev
        </Link>
      )}
      {pagesArray.map((page) => (
        <Link
          // href={`${route}?pageNumber=${page}`}
          href={{
            pathname: route,
            query: { pageNumber: prevPage },
          }}
          className={`${pageNumber === page ? "bg-gray-400" : ""} py-1 px-3 border border-gray-700 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
          key={page}
        >
          {page}
        </Link>
      ))}
      {pageNumber !== pages && (
        <Link
          // href={`${route}?pageNumber=${nextPage}`}
          href={{
            pathname: route,
            query: { pageNumber: prevPage },
          }}
          className="py-1 px-3 border border-gray-700 font-bold text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
