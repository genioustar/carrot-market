/**
 * /products/1/fav 로들어오면 호출 되는 부분
 * 하트를 누르면 Fav DB 테이블에 추가하고 이미 추가되어있으면 삭제하는 부분
 */

import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.query);
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await client.fav.findFirst({
    //여기서 client.fav.findUnique()를 쓰지 못하는 이유는 where 절에 unique 속성만 들어갈 수 있기 때문, Fav 테이블은 id만 유니크하기 때문에 findFirst를 사용
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    // delete : 삭제는 오로지 unique 값으로만 삭제가 가능 but 몰라도 가능하게 하려면 deleteMany를 사용하면됨
    //ex) await client.fav.deleteMany({ where : {userId: user.id}})
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    // create
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
