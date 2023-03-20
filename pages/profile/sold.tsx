import Layout from "@/components/layout";
import ProductList from "@/components/product-list";
import type { NextPage } from "next";

const Sold: NextPage = () => {
  return (
    <Layout title="판매목록" canGoBack seoTitle="판매목록">
      <div className="flex flex-col space-y-5 py-10">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
