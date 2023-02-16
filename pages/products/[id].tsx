import Layout from "@/components/layout";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import { Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";

// ProductWithUser를 Prisma의 Product를 extends 받아야 하는 이유는 js에서 Product에 user가 없기 때문!
interface ProductWithUser extends Product {
  user: User;
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}
interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: Boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  // console.log(router.query);
  const { mutate } = useSWRConfig(); // unbound Mutate
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    // mutate 함수를 통해서 캐시에 있는데이터를 변경시킬 수 있다!
    router.query.id ? `/api/products/${router.query.id}` : null // router.query.id가 없을 수도(undefined) 있기 때문에
  );
  console.log("product details : ", data);
  // 아래의 Fav 관련 함수들은 backend의 요청과 상관 없이 그냥 작동하는것 즉, await 이런거 사용 X
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate(
      (prev) =>
        // mutate를 통해서 단지 캐쉬데이터만 변경하는것!
        prev && {
          // prev && 붙여 줘야 에러가 안뜸! 왜냐면 prev가 없을수도 없기 때문에 타입스크립트는 타입관리하니까 붙여줘야함!
          ...prev,
          isLiked: !prev.isLiked,
        },
      false
    );
    // mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
    toggleFav({}); // toggleFav({}); // body가 비어있는 POST 요청이 됨!
  }; // 두번째 args는 실제 지금 SWR에 있는 userSWR('url') url이 key 값이다. key값이랑 데이터를 비교해서 재검증 하겠다는 true, false 면 재검증 안함
  return (
    <Layout canGoBack title="Product Details">
      <div className="px-4 py-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="mt-2 flex cursor-pointer items-center space-x-3 border-t border-b py-3">
            <div className="h-12 w-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {data?.product?.user?.name}s
              </p>
              <Link
                href={`/users/profiles/${data?.product?.user?.id}`}
                className="text-xs font-medium text-gray-500"
              >
                View profile &rarr;
              </Link>
            </div>
          </div>
          {/* TODO 데이터가 없을때 loading 하는거 넣기! 강의 11.4 댓글보고 하면될 듯! */}
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <p className="mt-3 text-3xl font-semibold text-gray-900">
              ${data?.product?.price}
            </p>
            <p className="my-6 text-base text-gray-700">
              {data?.product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <button className="flex-1 cursor-pointer rounded-md bg-yellow-300 py-3 font-semibold text-gray-50 shadow-lg transition-colors hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2">
                Talk to seller
              </button>
              <button
                onClick={onFavClick}
                className={cls(
                  "flex items-center justify-between rounded-md p-3",
                  data?.isLiked
                    ? "text-yellow-400 hover:bg-yellow-100 hover:text-yellow-600"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                )}
              >
                {data?.isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts.map((product: any) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div>
                  <div className="mb-4 h-56 w-full bg-slate-300" />
                  <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                  <span className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
