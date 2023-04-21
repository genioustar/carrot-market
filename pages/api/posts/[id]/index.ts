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
  } = req; // request에서 body에 있는 question을 question으로 받고, session에 있는 user를 user로 받기 위해서!
  const post = await client?.post.findUnique({
    where: { id: Number(id) },
    include: {
      // post와 연결된 user의 id와 name을 가져오는것! true로 하면되네??
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        // 이렇게 answer와 연관된 테이블의 정보를 가져오려면 일일이 select 로 가져와야 된다!
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        take: 10,
        skip: 10,
      },
      _count: {
        // 아래 조건과 일치하는 레코드 수를 계산하기 위한 method!
        select: {
          answers: true,
          curiosity: true,
        },
      },
    },
  });
  const isCuriosity = Boolean(
    await client?.curiosity.findFirst({
      where: {
        postId: Number(id),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  if (!post) res.status(404).json({ ok: false, error: "Not found post" }); // 404 not found 처리
  res.json({
    ok: true,
    post,
    isCuriosity,
  });
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler }) // 3개이상의 파라미터일떄는 이렇게 객체로 전달해주는게 가독성에 좋음! fn:handler가 아니어도 되는건! 받는애가 handler라서 가능! isPrivate = true 해둬서 필수값이 아닌걸로 뽑아냄!
);
