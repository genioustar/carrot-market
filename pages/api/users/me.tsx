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
  withHandler({ method: "GET", fn: handler, isPrivate: true }) // 3개이상의 파라미터일떄는 이렇게 객체로 전달해주는게 가독성에 좋음!
);
