import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    res.status(401).end();
  }
  console.log(req.body); // 이거는 {"phone":"123123123123"} 이렇게 잘 나오지만!
  // console.log(req.body.phone); // 이거는 undefined가 뜬다... 왜냐면 req 인코딩을 기반으로 작동해서 안나옴 따라서 front-end에서 herders설정이 필요함!
  res.status(200).end();
  // res.json({
  //   ok: "200 ok",
  // });
}
