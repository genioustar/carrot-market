import { useState } from "react";

// POST에 대한것만 커스텀훅을 만드는 이유는 GET은 SWR을 통해서 어메이징한 것들을 할 수 있기 때문이다!
export default function useMutation(
  url: string
): [
  (data?: any) => void,
  { loading: boolean; data: undefined | any; error: undefined | any }
] {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined); // 기본값은 undefined이고, data의 값은 undefined거나 any가 될 수 있다는뜻!
  const [error, setError] = useState<undefined | any>(undefined); // 기본값은 undefined이고, error 값은 undefined거나 any가 될 수 있다는뜻!
  function mutation(data?: any) {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {})) // catch가 있는건 response.json()이 동작하지 않을때가 있음.
      .then(setData) // then((json)=>setDate(json)) 이랑 같은거!
      .catch(setError)
      .finally(() => setLoading(false));
  }
  return [mutation, { loading, data, error }];
}
