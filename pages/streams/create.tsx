import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stream } from "stream";

interface CreateForm {
  name: string;
  price: string;
  description: string;
}

interface CreateResoponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { data, loading }] = useMutation(``);
  const { register, handleSubmit } = useForm<CreateForm>();
  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };
  useEffect(() => {
    console.log(data);
    if (data && data?.ok) router.push(`/streams/${data.stream.id}`);
  }, [data, router]);
  return (
    <Layout canGoBack title="동영상 등록">
      <form onSubmit={handleSubmit(onValid)} className="space-y-5 px-4 py-10">
        <Input
          register={register("name", { required: true })}
          id="name"
          label="name"
          kind="text"
          placeholder=""
        />
        <Input
          register={register("price", { required: true })}
          id="price"
          label="price"
          kind="price"
          placeholder="0.00"
        />
        <TextArea
          register={register("description", { required: true })}
          label="Description"
          name="description"
        />
        <Button text={loading ? "Loading..." : "Go live"}></Button>
      </form>
    </Layout>
  );
};

export default Create;
