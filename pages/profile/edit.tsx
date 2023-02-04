import Button from "@/components/button";
import Input from "@/components/input";
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
          <Input label="Email Addres" id="email" required type="email" />
        </div>
        <div className="space-y-1">
          <Input
            label="Phone Number"
            id="phone"
            kind="phone"
            type="phone"
            required
          />
        </div>
        <Button text="Update Profile" />
      </div>
    </Layout>
  );
};

export default EditProfile;
