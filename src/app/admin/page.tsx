import AddArticlesForm from "./AddArticlesForm";

async function Admin() {
  return (
    <div className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
          Add New Article
        </h2>
        <AddArticlesForm />
      </div>
    </div>
  );
}

export default Admin;
