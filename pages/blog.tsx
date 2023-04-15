import Layout from "@/components/layout";
import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";

interface postForm {
  title: string;
  date: string;
  category: string;
}

const Blog: NextPage<{ blogPosts: postForm[] }> = ({ blogPosts }) => {
  // 아래 getStaticProps에서 주는 값이랑 같아야함!
  console.log(blogPosts);
  return (
    <Layout title="Blog" seoTitle="BLOG">
      <h1 className="text-lg font-semibold">Latest Posts</h1>
      {blogPosts.map((blogPosts, index) => (
        <div key={index} className="mb-5">
          <span className="text-lg text-red-500">{blogPosts.title}</span>
          <div>
            <span>
              {blogPosts.date} / {blogPosts.category}
            </span>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  const blogPosts = readdirSync("./posts").map((file) => {
    const blogText = readFileSync(`./posts/${file}`, "utf-8");
    return matter(blogText).data;
  });
  return {
    props: { blogPosts }, // props의 이름이 위에 params이름과 같아야함!
  };
}

export default Blog;
