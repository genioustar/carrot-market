import { useState } from "react";

/**
 *
 * @param url server로 보낼 url을 params로 받는다.("/api/users/enter")
 * @returns enter.tsx에서 사용하는 enter 오브젝트는 function mutation을 뜻하고 이것은 입력받은 url로 fetch로 데이터를
 * 받아서 해당 데이터를 state 변수에 넣는다.
 * 이후 return으로 fetch하는 함수와 fetch된 결과를 보내준다.
 */
// POST에 대한것만 커스텀훅을 만드는 이유는 GET은 SWR을 통해서 어메이징한 것들을 할 수 있기 때문이다!
export default function useMutation(
  url: string
): [
  (data?: any) => void,
  { loading: boolean; data: undefined | any; error: undefined | any }
] {
  const [states, setStates] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data?: any) {
    setStates((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {})) // catch가 있는건 response.json()이 동작하지 않을때가 있음.
      .then((data) => setStates((prev) => ({ ...prev, data }))) // then((json)=>setDate(json)) 이랑 같은거!
      .catch((err) => setStates((prev) => ({ ...prev, err })))
      .finally(() => setStates((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, states];
}
