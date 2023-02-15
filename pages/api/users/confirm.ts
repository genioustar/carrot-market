import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // console.log(req.session); // 이렇게 req 에 session이 있는건 아래 withIronSessionApiRoute를 썻기 때문!
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: { user: true }, // 이 include를 사용하려면 schema.prisma에서 @relation 이설정을 해준거만 쓸수 있음!
  });
  console.log("token value : ", foundToken);
  if (!foundToken) return res.status(404).end(); //!가 들어가는건 값이 무조건 할당되어 있다고 컴파일러에게 말하는 것!
  req.session.user = {
    id: foundToken.userId,
  };
  await req.session.save();
  // token값은 한번쓰고 다시는 안쓰니까 해당된 user와 관련된 token의 값은 모두 지워주는 부분
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  return res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
