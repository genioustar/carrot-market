import client from "@/libs/server/client";
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
    body: { name, price, description },
  } = req;
  if (req.method === "POST") {
    console.log("123123123");
    const stream = await client?.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      stream,
    });
  }
  if (req.method === "GET") {
    const streams = await client?.stream.findMany({
      take: 25, // 한번에 10개 가져오게 세팅!
      skip: 25, // 다음에 가져올때 10개 띄고 가져와라라는 뜻 다음거는 20개로 해야되고 그럼!
    });
    res.json({
      ok: true,
      streams,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler }) // 3개이상의 파라미터일떄는 이렇게 객체로 전달해주는게 가독성에 좋음! fn:handler가 아니어도 되는건! 받는애가 handler라서 가능! isPrivate = true 해둬서 필수값이 아닌걸로 뽑아냄!
);
