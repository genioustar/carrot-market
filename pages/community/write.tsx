import Button from "@/components/button";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import useCoords from "@/libs/client/useCoords";
import useMutation from "@/libs/client/useMutation";
import { Post } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>(); //요청 타입 WriteForm으로 한정하기!
  const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts"); // res 타입 WriteResponse로 한정하기!
  //handleSubmit을 통과(validation 체크 통과)하면 API호출하는 부분
  const onValid = (data: WriteForm) => {
    if (loading) return; // 이 if 문은 유저가 submit을 연타했을때 API요청이 가는 것을 방지
    post({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data?.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="글쓰기" seoTitle="질문하기">
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-4">
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          required
          placeholder="Ask a question!"
        />
        <Button text={loading ? " Loading..." : "Submit"} />
      </form>
    </Layout>
  );
};

export default Write;
function useFormm<T>(): { register: any; handleSubmit: any } {
  throw new Error("Function not implemented.");
}
