import Layout from "@/components/layout";
import ProductList from "@/components/product-list";
import type { NextPage } from "next";

const Loved: NextPage = () => {
  return (
    <Layout title="찜목록" canGoBack>
      <div className="flex flex-col space-y-5 py-10">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;
