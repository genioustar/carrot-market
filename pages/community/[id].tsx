import Button from "@/components/button";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import client from "@/libs/server/client";
import { Answer, Post, User } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { SWRConfig } from "swr";

/**
 * Answer table에 있는 user 정보의 관계를 가져오기 위해서 잇어야하는 extends 받은 AnswerWithUser interface
 */
interface AnswerWithUser extends Answer {
  user: User;
  _count: {
    answers: number;
    curiosity: number;
  };
  answers: AnswerWithUser[]; // community/[id].ts 에서 answer이 응답으로 단순 데이터가아닌 relataion 테이블의 데이터를 가져옴으로 interface를 생성해줘야함.
}

/**
 * Post table의 형태를 상속받는데 이 포스트는 user table의 정보를 가지고 있어서 이렇게 interface로 만들어야함
 */
interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    curiosity: number;
  };
  answers: AnswerWithUser[]; // community/[id].ts 에서 answer이 응답으로 단순 데이터가아닌 relataion 테이블의 데이터를 가져옴으로 interface를 생성해줘야함.
}

/**
 * 실제로 community/[id]에서 리턴하는 타입이 post 데이터 정보 + user 정보를 가지는 post 객체임으로
 * 위에서 만든 Post를 extends 받은 PostWithUser interface 타입으로 선언한다.
 */
interface CoummunityPostREsponse {
  id: string; // router.query.id
  ok: boolean;
  post: PostWithUser;
  isCuriosity: boolean;
}

/**
 * /community/[id]로 들어와서 question에 대한 답글을 다는 것에 대한 interface
 */
interface AnswerForm {
  answer: string;
}

interface NomalPostResponse {
  ok: boolean;
}
const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<Answer>();
  const { data, mutate } = useSWR<CoummunityPostREsponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  ); // router의 query 값이 undefined일 수 있으므로 체크해주는 로직이 들어가야함.
  const [curiosity, { loading }] = useMutation<NomalPostResponse>(
    `/api/posts/${router.query.id}/curiosity`
  );
  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<NomalPostResponse>(`/api/posts/${router.query.id}/answers`);
  const onCuriosityClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            curiosity: data.isCuriosity
              ? data.post._count.curiosity - 1
              : data.post._count.curiosity + 1,
          },
        },
        isCuriosity: !data.isCuriosity,
      },
      false
    );
    //data가 로딩중이 아닐때만 backend로 요청을 보내게 함!
    if (!loading) {
      curiosity({});
    }
  };
  useEffect(() => {
    // data가 없으면 이전 페이지로 가게하는 것!
    if (data && !data.ok) {
      router.push("/community");
    }
  }, [data, router]);
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate(); // mutate안에 아무것도 없는 이유는 답변을 위한 reply버튼을 누르는 것으로 궁금해요 버튼과는 다르다. 따라서 mutate를 하는 궁금해요 클릭과는 상관없는 데이터가 수정됨으로 mutate안에 data를 채울수 없음!
    }
  }, [answerData, reset, mutate]);
  const onValid = (form: AnswerForm) => {
    // console.log(form);
    if (answerLoading) return;
    sendAnswer(form);
  };
  return (
    <Layout canGoBack seoTitle="Community">
      <div>
        <span className="my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mb-3 flex cursor-pointer items-center space-x-3 border-b px-4 pb-3">
          <div className="h-10 w-10 rounded-full bg-slate-300" />
          <Link href={`/users/profiles/${data?.post?.user.id}`}>
            <p className="text-sm font-medium text-gray-700">
              {data?.post?.user.name}
            </p>
            <p className="text-xs font-medium text-gray-500">
              View profile &rarr;
            </p>
          </Link>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-yellow-500">Q.</span>{" "}
            {data?.post?.question}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] px-4 py-2.5  text-gray-700">
            <button
              onClick={onCuriosityClick}
              className={cls(
                "flex items-center space-x-2 text-sm",
                data?.isCuriosity ? "text-teal-400" : ""
              )}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {data?.post?._count.curiosity}</span>
            </button>
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {data?.post?._count.answers}</span>
            </span>
          </div>
        </div>
        <div className="my-5 space-y-5 px-4">
          {data?.post?.answers.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  {answer.user.name}
                </span>
                <span className="block text-xs text-gray-500 ">2시간 전</span>
                <p className="mt-1 text-gray-700">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="px-4" onSubmit={handleSubmit(onValid)}>
          <TextArea
            name="description"
            placeholder="Answer this question!"
            required
            register={register("answer", { required: true, minLength: 10 })}
          />
          <Button text="Reply"></Button>
        </form>
      </div>
    </Layout>
  );
};

const Page: NextPage<CoummunityPostREsponse> = ({ id, post, isCuriosity }) => {
  return (
    <SWRConfig
      value={{
        fallback: { [`/api/posts/${id}`]: { ok: true, post, isCuriosity } },
      }}
    >
      <CommunityPostDetail />
    </SWRConfig>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.dir(ctx);
  const id = ctx.params?.id;
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }
  const post = await client?.post.findUnique({
    where: { id: Number(id) },
    include: {
      // post와 연결된 user의 id와 name을 가져오는것! true로 하면되네??
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        // 이렇게 answer와 연관된 테이블의 정보를 가져오려면 일일이 select 로 가져와야 된다!
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        take: 10,
        skip: 10,
      },
      _count: {
        select: {
          answers: true,
          curiosity: true,
        },
      },
    },
  });
  const isCuriosity = Boolean(
    await client?.curiosity.findFirst({
      where: {
        postId: Number(id),
        userId: post?.id,
      },
      select: {
        id: true,
      },
    })
  );
  return {
    props: { id, post: JSON.parse(JSON.stringify(post)), isCuriosity },
  };
};

export default Page;
