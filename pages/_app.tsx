import useUser from "@/libs/client/useUser";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useUser(); // useUser훅을 써야되는 이유가 useUser에서 로그인 여부를 판단해서 처리해주기 때문에 유저정보를 로그인 한 사람만 보여줄 수 있음!
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="mx-auto w-full max-w-xl">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
