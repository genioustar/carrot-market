import Layout from "@/components/layout";
import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface postForm {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ blogPosts: postForm[] }> = ({ blogPosts }) => {
  // 아래 getStaticProps에서 주는 값이랑 같아야함!
  // console.log(blogPosts);
  return (
    <Layout title="Blog" seoTitle="BLOG">
      <h1 className="text-lg font-semibold">Latest Posts</h1>
      {blogPosts.map((blogPosts, index) => (
        <div key={index} className="mb-5">
          <Link href={`/blog/${blogPosts.slug}`}>
            <span className="text-lg text-red-500">{blogPosts.title}</span>
            <div>
              <span>
                {blogPosts.date} / {blogPosts.category}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const blogPosts = readdirSync("./posts").map((file) => {
    const blogText = readFileSync(`./posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(blogText).data, slug };
  });
  return {
    props: { blogPosts }, // props의 이름이 위에 params이름과 같아야함!
  };
};

export default Blog;
