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
    body: { answer },
  } = req; // request에서 body에 있는 question을 question으로 받고, session에 있는 user를 user로 받기 위해서!
  const newAnswer = await client?.answer.create({
    data: {
      user: {
        //user는 realtaion table에 있는 값이기 때문에!
        connect: {
          id: user?.id,
        },
      },
      //post는 realtaion table에 있는 값이기 때문에!
      post: {
        connect: {
          id: Number(id),
        },
      },
      answer, // 위에는 user, post를 연결해주는거고 실제 answer data는 body에서 가져온걸로 세팅하는 것
    },
  });
  if (!newAnswer) res.status(404).json({ ok: false, error: "Not found post" }); // 404 not found 처리
  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler }) // 3개이상의 파라미터일떄는 이렇게 객체로 전달해주는게 가독성에 좋음! fn:handler가 아니어도 되는건! 받는애가 handler라서 가능! isPrivate = true 해둬서 필수값이 아닌걸로 뽑아냄!
);
