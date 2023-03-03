import Layout from "@/components/layout";
import useMutation from "@/libs/client/useMutation";
import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface StreamResponse {
  ok: boolean;
  stream: Stream;
}

interface MessageForm {
  message: string;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    sendMessage(form);
  };
  useEffect(() => {
    // data가 없으면 이전 페이지로 가게하는 것!
    if (data && !data.ok) {
      router.push("/streams");
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="라이브 방송">
      <div className="space-y-4 px-4 py-10">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
        <h1 className="text-3xl font-bold text-gray-900">
          {data?.stream?.name}
        </h1>
        <span className="mt-3 block text-2xl text-gray-900">
          ${data?.stream?.price}
        </span>
        <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
        <div className="h-[50vh] space-y-2 overflow-y-scroll py-10 px-4 pb-16">
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              Hi how much are you selling
            </p>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-300" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              I want ￦20,000
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              Hi how much are you selling
            </p>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-300" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              I want ￦20,000
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              Hi how much are you selling
            </p>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-300" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              I want ￦20,000
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              Hi how much are you selling
            </p>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-300" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              I want ￦20,000
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              Hi how much are you selling
            </p>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-300" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              I want ￦20,000
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              Hi how much are you selling
            </p>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-300" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              I want ￦20,000
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              Hi how much are you selling
            </p>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-300" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              I want ￦20,000
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              Hi how much are you selling
            </p>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-300" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              I want ￦20,000
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              Hi how much are you selling
            </p>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-300" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              I want ￦20,000
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              Hi how much are you selling
            </p>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-300" />
            <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              I want ￦20,000
            </p>
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-2 mx-auto w-full max-w-md">
          <form
            onSubmit={handleSubmit(onValid)}
            className="relative flex items-center"
          >
            <input
              type="text"
              {...register("message", { required: true })}
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

export default StreamDetail;
