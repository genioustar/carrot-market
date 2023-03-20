import Layout from "@/components/layout";
import Message from "@/components/message";
import type { NextPage } from "next";

const ChatDetail: NextPage = () => {
  return (
    <Layout title="Steve" canGoBack seoTitle="Chatting">
      <div className="mt-2 space-y-2 px-4 pb-16">
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />
        <Message message="Hi how much are you selling" />
        <Message reversed={true} message="I want ￦20,000" />

        <div className="fixed inset-x-0 bottom-2 mx-auto w-full max-w-md">
          <div className="relative flex items-center">
            <input
              type="text"
              className="forcus:outline-none w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-yellow-500 focus:ring-yellow-300"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="flex cursor-pointer items-center rounded-full bg-yellow-400 px-3 text-sm text-white transition-colors hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
