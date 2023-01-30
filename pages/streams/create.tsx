import Layout from "@/components/layout";
import type { NextPage } from "next";

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="동영상 등록">
      <div className="space-y-5 px-4 py-10">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <div className="flex items-center rounded-md shadow-sm">
            <input
              className="w-full appearance-none rounded-md border border-gray-300 py-2 px-2 text-sm placeholder-gray-400 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
              id="name"
              type="text"
              placeholder=""
            />
          </div>
        </div>
        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="price"
          >
            Price
          </label>
          <div className="relative flex items-center rounded-md shadow-sm">
            <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
              <span className="text-sm text-gray-500">$</span>
            </div>
            <input
              className="w-full appearance-none rounded-md border border-gray-300 py-2 px-2 pl-7 text-sm placeholder-gray-400 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
              id="price"
              type="text"
              placeholder="0.00"
            />
            <div className="pointer-events-none absolute right-0 flex items-center pr-3">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
            rows={4}
          />
        </div>
        <button className="mt-4 w-full rounded-md border border-transparent bg-yellow-300 px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
          Go live
        </button>
      </div>
    </Layout>
  );
};

export default Create;
