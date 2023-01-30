import Layout from "@/components/layout";
import type { NextPage } from "next";

const EditProfile: NextPage = () => {
  return (
    <Layout title="프로필 수정" canGoBack>
      <div className="space-y-5 px-4 py-10">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium shadow-sm  transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            className="w-full appearance-none rounded-md border border-gray-300 py-2 px-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
            type="email"
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="flex rounded-md shadow-sm">
            <span className="flex select-none items-center justify-between rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 ">
              +82
            </span>
            <input
              id="input"
              type="number"
              className="w-full appearance-none rounded-xl rounded-l-none border border-gray-300 py-2 px-2 placeholder-gray-400 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
              required
            />
          </div>
        </div>
        <button className="mt-4 w-full rounded-md border border-transparent bg-yellow-300 px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
          Update Profile
        </button>
      </div>
    </Layout>
  );
};

export default EditProfile;
