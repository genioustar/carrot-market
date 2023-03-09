import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import cat from "../public/local.jpg";

export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}
export interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>("/api/products"); // useSWR이 데이터를 가져올때 어떤 타입을 가져오는지 알려주기 위해서 <>에 interface를 넣는다!
  console.log(data);
  return (
    <Layout title="Home" hasTabBar>
      <Head>
        <title>HOME</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            name={product.name}
            color="Space Gray"
            price={product.price}
            loved={product._count.favs}
            comments={10}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
      <Image src={cat} placeholder="blur" alt={""} quality={100} />
    </Layout>
  );
};

export default Home;
