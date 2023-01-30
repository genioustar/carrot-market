import Layout from "@/components/layout";
import type { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <Layout canGoBack title="글쓰기">
      <form className="px-4 py-4">
        <textarea
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 "
          rows={4}
          placeholder="Ask a question!"
        />
        <button className="mt-2 w-full rounded-md border border-transparent bg-yellow-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Write;
