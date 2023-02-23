import Button from "@/components/button";
import Input from "@/components/input";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface MutationResult {
  /*server에서 주는 data (api/users/confirm or enter.ts) res.status를 줄때 ok라는 값을 주는데 이값을 boolean으로 특정해서
   * 왜 res.status ok로 결과를 주냐면 POST에 대한거만 처리하니까! DB 상태를 변경하고 잘됐으면 ok: true, 안됐으면 ok: false로 주는거임
   */
  ok: boolean;
}

interface TokenForm {
  //email or phone 으로 인증번호 받고 Comfirm 하기 위한 화면의 input 값들
  token: string;
}

// 여기에 ? 안붙이면 타입스크립트에서 validForm이 없으면 어떻할래?? 하는 에러가 나서 붙여줘야함!
interface EnterForm {
  // email or phone으로 들어오는 input 값의 형태들
  email?: string;
  phone?: string;
}
/**
 *
 * @returns handleSubmit은 유효성 검증이 통과된 데이터를 받는데 받으면 onValid함수를 호출한다.
 * onValid함수에서는 useMutation함수의 enter함수인 오브젝트를 뜻하고 이 enter는 useMutation의
 * return 값인 mutation함수를 뜻한다. --> return [mutation, states]; mutation은 api를 통해서 데이터를 가져온다.
 * useMutation에서 받은 데이터는 post로 데이터를 받아온 것임으로 {loading, data, error} 에 데이터를 세팅함.
 */
export default function Enter() {
  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/enter"); // api POST를 호출하는 훅으로 enter라는 function과 object를 리턴하는 hook을 만듬!
  const { register, watch, handleSubmit, reset } = useForm<EnterForm>(); //useForm에서 활용하는 타입은 EnterForm 타입
  const [confirmToken, { loading: tokenLoading, data: tokenData }] = // api POST로 호출하는 것으로 Token 테이블의 토큰값을 가져오는 훅
    useMutation<MutationResult>("/api/users/confirm");
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>(); // useForm에서 쓰고 있는 네이밍을 다른 네이밍으로 쓰고 싶을때 사용.
  const [method, setMethod] = useState<"email" | "phone">("email"); // ts를 사용하여 email, phone의 값만 받게 하기 위해서 <S> <- type넣는 부분에 "email | "phone" 이거 넣우준거임!
  const onEmailClick = () => {
    reset(); // reset이 들어가는 이유는 아래에서 탭을 바꿔 누르면 입력받은 값이 안지워지고 그대로 유지되기 때문!
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset(); // reset이 들어가는 이유는 아래에서 탭을 바꿔 누르면 입력받은 값이 안지워지고 그대로 유지되기 때문!
    setMethod("phone");
  };
  const onValid = (validForm: EnterForm) => {
    enter(validForm); //이 vaildForm 데이터는 input에서 들어온 {email:123@gmail.com} or {phone:01012345678}임!
  };
  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };
  const router = useRouter();
  useEffect(() => {
    console.log("tokenData.ok : ", tokenData?.ok);
    if (tokenData?.ok) {
      //token값을 검증하고 검증결과가 true로 나오면 기본 페이지로 이동하는부분!
      router.push("/");
    }
  }, [tokenData, router]); // tokenData의 state 가 변경되었을때만 호출됨! 여기서 왜 router도 들어있나? 싶은데 이건 useEffect에 router도 같이 사용하고 있기 때문에!
  return (
    <div className="mt-16 px-16">
      <h3 className="text-center text-3xl font-bold text-yellow-400">
        Enter to Mango
      </h3>
      <div className="mt-8">
        {data?.ok ? ( //data는 login의 결과로 가져오는 것으로 data가 있으면 token인증 UI를 없으면 email or phone번호 넣는 UI를 보여준다.
          <form
            onSubmit={tokenHandleSubmit(onTokenValid)}
            className="mt-4 flex flex-col"
          >
            <div className="mt-2">
              <Input
                register={tokenRegister("token", {
                  required: true,
                })}
                id="token"
                label="Confirmation Token"
                type="number"
                required
                kind="text"
              />
            </div>
            <Button text={tokenLoading ? "Loading" : "Comfirm Token"}> </Button>
          </form> // 여기서 data에 ? 붙은 이유는 data가 undefind일 수 있어서! 이 data 때문에 useMutation.tsx에 제너럴을 통해서 리팩토링을 시작했다!
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h5 className="text-sm font-medium text-gray-500">
                Enter Using:
              </h5>
              <div className="mt-8 grid w-full grid-cols-2 gap-16 border-b">
                <button
                  className={cls(
                    "border-b-2 pb-4 font-medium",
                    method === "email"
                      ? " border-yellow-500 text-yellow-400"
                      : "border-transparent text-gray-500"
                  )}
                  onClick={onEmailClick}
                >
                  Email
                </button>
                <button
                  className={cls(
                    "border-b-2 pb-4 font-medium",
                    method === "phone"
                      ? " border-yellow-500 text-yellow-400"
                      : "border-transparent text-gray-500"
                  )}
                  onClick={onPhoneClick}
                >
                  Phone
                </button>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onValid)}
              className="mt-4 flex flex-col"
            >
              <div className="mt-2">
                {method === "email" ? (
                  <Input
                    register={register("email", { required: true })}
                    id="text"
                    label="Email Address"
                    type="email"
                    required
                    kind="text"
                  />
                ) : null}
                {method === "phone" ? (
                  <Input
                    register={register("phone", { required: true })}
                    id="phone"
                    label="Phone Number"
                    type="phone"
                    required
                    kind="phone"
                  />
                ) : null}
              </div>

              {method === "email" ? (
                <Button text={loading ? "Loading" : "Get login link"}> </Button>
              ) : null}
              {method === "phone" ? (
                <Button text={loading ? "Loading" : "Get one-time password"} />
              ) : null}
            </form>
          </>
        )}

        <div className="mt-8">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center">
              <span className="bg-white px-2  text-sm text-gray-500">
                Or enter with
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
