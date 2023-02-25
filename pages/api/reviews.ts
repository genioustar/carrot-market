import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * 나의 망고에서 리뷰를 가져오는 함수
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
  const reviews = await client?.review.findMany({
    where: {
      createdForId: user?.id,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    reviews,
  });
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler }) // 3개이상의 파라미터일떄는 이렇게 객체로 전달해주는게 가독성에 좋음! fn:handler가 아니어도 되는건! 받는애가 handler라서 가능! isPrivate = true 해둬서 필수값이 아닌걸로 뽑아냄!
);
