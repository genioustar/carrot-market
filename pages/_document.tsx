import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

/**
 * 페이지를 랜더링하는데 사용되는 html 및 body 태그를 업데이트할 수 있는것!
 * 여기에 설정하면 모든페이지에 적용되는것!
 * 서버에서 한번만 실행됨. 따라서 onClick 이벤트 같은걸 추가할 수 없음!
 * @returns
 */
export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 구글폰트일때만 해당되는 기능으로!! nextjs에서 빌드하고 앱을 배포할때 link에 존재하는 css를 다운로드해서 <style>안에 @font-face{...}으로 싹다 바꿔줌! */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          onLoad={() => {}}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
