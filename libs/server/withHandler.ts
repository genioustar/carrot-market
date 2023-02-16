/**
 * session에 관련덴 데이터가 아닐경우 api를 호출할때 검증해주는 함수
 */
import { NextApiRequest, NextApiResponse } from "next";
// response type은 여러군대에서 사용할 것으로 이곳에서 설정하고 다른곳에서 import해서 사용!
export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";

interface ConfigTypes {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

// 이 /api/users/enter로 URI로 접속하는걸 차단해주는 함수.
export default function withHandler({
  methods,
  handler,
  isPrivate = true,
}: ConfigTypes) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      res.status(405).end();
      return;
    }
    if (isPrivate && !req.session.user?.id) {
      res.status(401).json({ ok: false, error: "Plz log in." });
    }
    try {
      await handler(req, res); // api/users/enter.tsx에서 입력받은 handler라는 함수가 될 것! handler라는 함수는 /api/users/enter.tsx에 있음!
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
