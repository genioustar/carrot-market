import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const talkTo = req.url?.split("chatToId=")[1];
    const chats = await client?.chat.findMany({
      where: {
        OR: [
          {
            AND: [
              { chatFromId: req.session.user?.id },
              { chatToId: Number(talkTo) },
            ],
          },
          {
            AND: [
              { chatFromId: Number(talkTo) },
              { chatToId: req.session.user?.id },
            ],
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    // console.log(chats);
    res.json({
      ok: true,
      chats,
    });
  }
  if (req.method === "POST") {
    /** 이거랑 같은 코드!
     * const { name, price, description } = req.body;
     * const { user } = req.session;
     */
    const {
      body: { talk, chatFromId, chatToId },
      session: { user },
    } = req;
    console.log(user);
    const chat = await client?.chat.create({
      data: {
        talk,
        // chatFrom과 연계하려고 chatFromId, chatToId가 connect에 사용되어 짐으로 따로 chatFromId, chatToId는 안써도됨!
        chatFrom: {
          connect: { id: chatFromId },
        },
        chatTo: {
          connect: { id: +chatToId },
        },
      },
    });
    res.json({
      ok: true,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler }) // 3개이상의 파라미터일떄는 이렇게 객체로 전달해주는게 가독성에 좋음! fn:handler가 아니어도 되는건! 받는애가 handler라서 가능! isPrivate = true 해둬서 필수값이 아닌걸로 뽑아냄!
);
