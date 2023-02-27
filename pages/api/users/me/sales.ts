import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * 나의 관심상품을 모두 가져오는 부분
 * @param req
 * @param res
 */
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  const mysales = await client?.sale.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        // product 안에 좋아요 하트가 있는건 좋아요는 product와 연관있는 데이터이기 때문!
        include: {
          _count: {
            select: {
              favs: true,
            },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    mysales,
  });
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler }) // 3개이상의 파라미터일떄는 이렇게 객체로 전달해주는게 가독성에 좋음! fn:handler가 아니어도 되는건! 받는애가 handler라서 가능! isPrivate = true 해둬서 필수값이 아닌걸로 뽑아냄!
);
