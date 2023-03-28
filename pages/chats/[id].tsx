import Layout from "@/components/layout";
import Message from "@/components/message";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { Chat } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
interface ChatResponse {
  ok: boolean;
  chats: Chat[];
}
interface ChatForm {
  talk: string;
  chatFromId: number;
  chatToId: number;
}
interface ChatFormRes {
  ok: boolean;
}

const ChatDetail: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { data: ChatData, mutate } = useSWR<ChatResponse>(
    `/api/chats/${router.query.id}?chatToId=${router.query.id}`
  );
  const { register, handleSubmit, reset } = useForm<ChatForm>();
  const onValid = ({ talk }: ChatForm) => {
    // console.log(talk);
    reset();
    uploadChat({ talk, chatFromId: user?.id, chatToId: router.query.chatToId });
  };
  const [uploadChat, { data, loading, error }] = useMutation<ChatFormRes>(
    `/api/chats/${router.query.id}?chatToId=${router.query.id}`
  );
  useEffect(() => {
    if (!data) return;
    mutate((prev) => prev && { ...prev });
  }, [data, mutate]);
  /* 이거 찍으면 서버에도 처음에 무조건 undefined 뜨는데 이유는 처음에 페이지가 랜더링 될때 해당 값이 없어서 나는 것! 제대로 렌더링 되면 화면에 값이 나오게 됨! */
  console.log(ChatData);
  // console.log(user);
  // console.log(router.query);
  return (
    <Layout title="Steve" canGoBack seoTitle="Chatting">
      <div className="mt-2 space-y-2 px-4 pb-16">
        {ChatData?.chats.map((chat: any) =>
          chat.chatFromId === user?.id ? (
            <Message key={chat.id} reversed={true} message={chat.talk} />
          ) : (
            <Message key={chat.id} message={chat.talk} />
          )
        )}
        <div className="fixed inset-x-0 bottom-2 mx-auto w-full max-w-md">
          <form
            onSubmit={handleSubmit(onValid)}
            className="relative flex items-center"
          >
            <input
              {...register("talk", { required: true })}
              type="text"
              className="forcus:outline-none w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-yellow-500 focus:ring-yellow-300"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="flex cursor-pointer items-center rounded-full bg-yellow-400 px-3 text-sm text-white transition-colors hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
