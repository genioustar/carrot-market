import Item from "@/components/item";
import Layout from "@/components/layout";
import type { NextPage } from "next";

const Loved: NextPage = () => {
  return (
    <Layout title="찜목록" canGoBack>
      <div className="flex flex-col space-y-5 py-10">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            id={i}
            key={i}
            name="iPhone 14"
            color="Space Gray"
            price={99}
            loved={3}
            comments={10}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Loved;
