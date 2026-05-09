import React from "react";

const SingleArticleLoading = () => {
  return (
    <section className="fix-height container m-auto w-full px-5 md:w-3/4 mt-8 animate-pulse">
      <div className="bg-white p-7 rounded-lg">
        <h1 className="bg-gray-300 h-6 mb-2 rounded-lg"></h1>
        <div className="text-gray-300 h-4 rounded-lg"></div>
        <p className="bg-gray-300 mt-5 h-6 rounded-lg"></p>
      </div>
      <div className="mt-8">
        <div className="p-2 rounded-lg bg-gray-300 h-10"></div>
        <button className="bg-gray-300 mt-2 p-1 rounded-lg h-8 w-20"></button>
      </div>
    </section>
  );
};

export default SingleArticleLoading;
