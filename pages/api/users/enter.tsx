import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body); // 이거는 {"phone":"123123123123"} 이렇게 잘 나오지만!
  // console.log(req.body.phone); // 이거는 undefined가 뜬다... 왜냐면 req 인코딩을 기반으로 작동해서 안나옴 따라서 front-end에서 herders설정이 필요함!
  return res.status(200).end();
  // res.json({
  //   ok: "200 ok",
  // });
}

export default withHandler("POST", handler);

/* 위의 함수는 server/withHandler.ts에서 리턴하는 함수로 대체될것!
export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) { // mtehod 는 입력받은 POST일 것이고
      res.status(405).end();
      return;
    }
    try {
      await fn(req, res); // api/users/enter.tsx에서 입력받은 handler라는 함수가 될 것!
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
*/
