import Layout from "@/components/layout";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import { ChatResponse } from "./[id]";

const Chat: NextPage = () => {
  const { data } = useSWR<ChatResponse>(`/api/chats`);
  // console.log(data);
  return (
    <Layout title="메세지" hasTabBar seoTitle="Chat List">
      <div className="divide-y">
        {data?.chats.map((chat, i) => (
          <Link key={i} href={`/chats/${i}?chatToId=${chat.chatToId}`}>
            <div className="flex cursor-pointer items-center space-x-3 py-3 px-4">
              <div className="h-10 w-10 rounded-full bg-slate-300" />
              <div>
                <p className="text-gray-700">Steve Jebs</p>
                <p className="text-xs font-medium text-gray-500">
                  See you tomorrow in the corner at 2pm!
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chat;
