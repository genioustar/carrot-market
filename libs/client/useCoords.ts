import { useEffect, useState } from "react";

/**
 * 위치정보를 가져오는 hook을 만들었음.
 */
interface GeolocationData {
  latitude: number | null;
  longitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<GeolocationData>({
    latitude: null,
    longitude: null,
  });
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };
  // 페이지가 처음 생성되었을때 실행되면 latitude, longitude의 값은 위에서 초기화한값인 Null이 됨으로 클라이언트쪽(/community)에서 에러로그 가 발생하게 된다. 이를 위해 /community에서 latitude, longitude가 있을때만 api요청을 보내게 바꿈!
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return coords;
}
