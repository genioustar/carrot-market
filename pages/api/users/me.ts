import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //   console.log(req.session.user); //req.session.user의 값은 confirm에서 token으로 user.Id를 넣었기 때문에 cookie에 남아있어서 알 수 있음!
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler }) // 3개이상의 파라미터일떄는 이렇게 객체로 전달해주는게 가독성에 좋음! fn:handler가 아니어도 되는건! 받는애가 handler라서 가능! isPrivate = true 해둬서 필수값이 아닌걸로 뽑아냄!
);
