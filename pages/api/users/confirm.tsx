import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

// declare를 쓰는건 변수, 상수, 함수, 클래스 가 어딘가에 이미 선언되어있음을 말해주는거!
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session); // 이렇게 req 에 session이 있는건 아래 withIronSessionApiRoute를 썻기 때문!
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: { user: true }, // 이 include를 사용하려면 schema.prisma에서 @relation 이설정을 해준거만 쓸수 있음!
  });
  console.log("token value : ", exists);
  if (!exists) return res.status(404).end();
  req.session.user = {
    id: exists.userId,
  };
  await req.session.save();
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password:
    "9845904809485098594385093840598df;slkgjfdl;gkfsdjg;ldfksjgdsflgjdfklgjdflgjflkgjdgd",
});
