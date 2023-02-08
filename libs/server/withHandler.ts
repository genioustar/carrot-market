import { NextApiRequest, NextApiResponse } from "next";
// response type은 여러군대에서 사용할 것으로 이곳에서 설정하고 다른곳에서 import해서 사용!
export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

// 이 /api/users/enter로 URI로 접속하는걸 차단해주는 함수.
export default function withHandler(
  method: "POST" | "GET" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      res.status(405).end();
      return;
    }
    try {
      await fn(req, res); // api/users/enter.tsx에서 입력받은 handler라는 함수가 될 것! handler라는 함수는 /api/users/enter.tsx에 있음!
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
