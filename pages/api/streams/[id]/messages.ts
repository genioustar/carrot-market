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
    query: { id },
    body, // message에 대한 id 정보를 가져오기 위해서! 이건 body에 채워주니까!
    session: { user }, // 누가 채팅을 치고 있는지 알아야하니까!
  } = req;
  const message = await client?.message.create({
    data: {
      message: body.message,
      stream: {
        connect: {
          id: Number(id),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    message,
  });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler }) // 3개이상의 파라미터일떄는 이렇게 객체로 전달해주는게 가독성에 좋음! fn:handler가 아니어도 되는건! 받는애가 handler라서 가능! isPrivate = true 해둬서 필수값이 아닌걸로 뽑아냄!
);
