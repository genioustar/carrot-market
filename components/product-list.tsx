import { ProductWithCount } from "pages";
import useSWR from "swr";
import Item from "./item";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {/* 이렇게 에러가 나는 이유는 useSWR을 이용해서 데이터를 받았는데 그 데이터 타입이 뭔지를 알 수 없기 때문에 에러가 난다. 이를 해결하기 위해서 받은 데이터를 interface로 만든다! */}
      {/* notion Typescript 간단정리 참고 */}
      {data[kind].map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          name={record.product.name}
          price={record.product.price}
          loved={record.product._count.favs}
          comments={10}
          color={"Space Gray"}
        />
      ))}
    </>
  ) : null;
}
