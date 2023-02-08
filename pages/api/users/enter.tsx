import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import mail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
mail.setApiKey(process.env.SENDGRID_KEY!);

// method 검증이 끝나고 들어온 부분!
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null; // 화면에서 입력값이 phone or email이라서 그 중 하나를 선택하고!
  if (!user) return res.status(400).json({ ok: false }); //
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE!, // ! 가 붙는 이유는! .env에 MY_PHONE가 없을 수도 있기 때문에!
  //     body: `Your login token is ${payload}.`,
  //   });
  //   console.log(message);
  // } else if (email) {
  //   const email = await mail.send({
  //     from: "ropa_ropa@naver.com",
  //     to: "ropa_ropa@naver.com",
  //     subject: "Your Carrot Market Verification Email",
  //     text: `Your Payload is ${payload}`,
  //   });
  //   console.log(email);
  // }

  // token table은 payload와 user가 필수 값임.
  const token = await client.token.create({
    data: {
      payload,
      user: {
        // user와 token을 연결시킬때 user가 없으면 생성하게 아래처럼 하면 된다!
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user, // phone일때 {phone: +phone} email일때 {email}
          },
        },
      },
    },
  });

  return res.json({
    ok: true,
  });

  /* 이게 email or phone으로 이름은 무조건 Anonymous로 만들고 있으면 있다고 console.log 해주는 기본코드
  if (email) {
    let user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("Found it.");
    if (!user) {
      console.log("Did not find. Will Create");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
  }
  if (phone) {
    let user = await client.user.findUnique({
      where: {
        phone: +phone, // string to number. number to string -> 123 +""
      },
    });
    if (user) console.log("Found it.");
    if (!user) {
      console.log("Did not find. Will Create");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
  }
*/
  /* 설명코드
  console.log(req.body); // 이거는 {"phone":"123123123123"} 이렇게 잘 나오지만!
  console.log(req.body.phone); // 이거는 undefined가 뜬다... 왜냐면 req 인코딩을 기반으로 작동해서 안나옴 따라서 front-end에서 herders설정이 필요함!
  return res.status(200).end();
  res.json({
    ok: "200 ok",
  });
  */
}

// ★★★★★fetch로 /api/users/enter로 들어오면 실행되는 함수!★★★★★
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
