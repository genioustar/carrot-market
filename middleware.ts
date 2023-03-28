import { getIronSession } from "iron-session/edge";
import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  console.log("global middleware!");
  // console.log(req.cookies);
  // console.log(req.url);
  // console.log(req.nextUrl);
  if (userAgent(req).isBot) {
    // 새로운 error 화면을 만들고 그쪽으로 rewrite 시켜줄것
    return new Response("Plz dont't be a bot. Be human.", { status: 403 });
  }

  const res = NextResponse.next();
  //ironsession에서 세션 데이터 가져오는 부분!
  const session = await getIronSession(req, res, {
    cookieName: "carrotsession",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV! === "production", // if you are using https
    },
  });

  // /enter가 뒤에 조건으로 붙는 이유는 /enter로 가도 cookies는 없기 때문에 계속 아래 로직을 타기 때문에 이를 방지하기 위해서!
  if (!session.user && !req.url.includes("/enter")) {
    // req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
    req.nextUrl.pathname = "/enter";
    // console.log(req.nextUrl);

    return NextResponse.redirect(req.nextUrl);
  }

  // if (req.nextUrl.pathname.startsWith("/chats")) {
  //   // This logic is only applied to /chats
  //   console.log("chat URL ONLY middleware!");
  //   console.log(req.nextUrl);

  //   // return NextResponse.json({ ok: true, user: session.user });
  // }
};

// 이 정규식을 통해서 api호출할때나 static 파일등을 호출할 때 middleware가 호출되는 것을 방지한다.
export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
