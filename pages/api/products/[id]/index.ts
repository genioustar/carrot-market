/**
 * /products/1 이기 때문에 상위 폴더의 [id].ts와 같게된다!
 * /api/products/index.js를 가져와서 바꿈!
 */

import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const product = await client.product.findUnique({
    where: {
      // id: +id.toString(), 이게 id가 indefined 일 수 있다고 에러남
      id: Number(id),
    },
    include: {
      user: {
        select: {
          // user의 모든 정보가 아니라 필요한 정보만 가져오는 부분!
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word, // product의 name이 Galuxy S23 이렇게 띄어쓰기로 되어있어서 map을통해서 Galuxy와 S23 2번 contain한 데이터를 리턴해주게 하는것!
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id, // 지금 내꺼는 유사항목에서 제외하기 위한 부분!
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        productId: product?.id,
        userId: user?.id,
      },
      select: {
        // 모든거 안가져오고 id 만 가져오가헤는 select 문!
        id: true,
      },
    })
  );
  res.json({ ok: true, product, isLiked, relatedProducts });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
