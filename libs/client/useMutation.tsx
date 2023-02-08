import { useState } from "react";

/**
 *
 * @param url server로 보낼 url을 params로 받는다.("/api/users/enter")
 * @returns enter.tsx에서 사용하는 enter 오브젝트는 function mutation을 뜻하고 이것은 입력받은 url로 fetch로 데이터를
 * 받아서 해당 데이터를 state 변수에 넣는다.
 * 이후 return으로 fetch하는 함수와 fetch된 결과를 보내준다.
 * interface를 통한 코드 리펙토링을 하는건 github의 commit "token 만들어서 UI까지 적용하는거 완료!"를 보고 주석이랑 같이 이해하자!
 */

// data가 어떤 타입이던 받을 수 있기 때문에! <T>로 interface에 제너릭 설정해야 함
interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>]; // type이랑 interface랑 비슷하니 interface로 바꾸려고하면 리턴하는 array가 같은 타입으로 구성되지 않아서 사용자 type을 만듬!

// POST에 대한것만 커스텀훅을 만드는 이유는 GET은 SWR을 통해서 어메이징한 것들을 할 수 있기 때문이다!
export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {})) // catch가 있는건 response.json()이 동작하지 않을때가 있음.
      .then((data) => setState((prev) => ({ ...prev, data }))) // then((json)=>setDate(json)) 이랑 같은거!
      .catch((err) => setState((prev) => ({ ...prev, err })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, state];
}
