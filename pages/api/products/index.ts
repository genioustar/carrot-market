import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  /** 이거랑 같은 코드!
   * const { name, price, description } = req.body;
   * const { user } = req.session;
   */
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  const product = await client?.product.create({
    data: {
      name,
      price: +price,
      description,
      image: "xx",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    product,
  });
}

export default withApiSession(
  withHandler({ method: "POST", handler }) // 3개이상의 파라미터일떄는 이렇게 객체로 전달해주는게 가독성에 좋음! fn:handler가 아니어도 되는건! 받는애가 handler라서 가능! isPrivate = true 해둬서 필수값이 아닌걸로 뽑아냄!
);
