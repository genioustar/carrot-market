import Layout from "@/components/layout";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
  return (
    <Layout title={data.title} seoTitle={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      ></div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const files = readdirSync("./posts").map((file) => {
    const [name, _] = file.split(".");
    return { params: { slug: name } };
  });
  console.log(files);
  return { paths: files, fallback: false }; // [{ params: { slug: '01-first-post' } }, { params: { slug: '02-first-trable' } }]
};

// typescript쓰면 이렇게 해줘야함! 왜냐면 타입을 다 정의해야하니까!
export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(ctx.params?.slug);
  const { content, data } = matter.read(`./posts/${ctx.params?.slug}.md`);
  //npm i remark-html remark-parse unified 을 사용해서 .md 파일을 html파일로 변환!
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return { props: { post: value, data } };
};

export default Post;
