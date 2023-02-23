import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
/**
 * User 정보를 단순 get해오는 부분!
 * @returns
 */
export default function useUser() {
  const { data, error } = useSWR("/api/users/me");
  const router = useRouter();
  console.log(data);
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);
  /*
  * 위의 useSWR이 아래의 기능을 해준다! 다만 router.replace("/enter")는 나중에 내가 더해줘야함!
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me") // /api/users/me 에서 데이터를 가져오고
      .then((response) => response.json()) // response 받은 데이터를 가지고 json을 만들고
      .then((json) => {
        // 이 json을 가지고 json에 있는 값 중 ok가 true or false를 가지고 판단!
        if (!json.ok) {
          router.replace("/enter");
        } else {
          setUser(json.profile);
        }
      });
  }, [router]); // router를 안 넣어줘도 되지만(절대 변경될리가 없어서... but 프로그램에서 워닝을 내줘서 넣어줌!)
 return user;
 */
  return { user: data?.profile, isLoading: !data && !error };
}
