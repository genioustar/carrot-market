import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import type { NextPage } from "next";

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="동영상 등록">
      <div className="space-y-5 px-4 py-10">
        <Input id="name" label="name" kind="text" placeholder="" />
        <Input id="price" label="price" kind="price" placeholder="0.00" />
        <TextArea label="Description" name="description" />
        <Button text="Go live"></Button>
      </div>
    </Layout>
  );
};

export default Create;
