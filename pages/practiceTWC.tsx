import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="grid min-h-screen gap-10 space-y-5 bg-slate-400 py-20 px-20 lg:grid-cols-2 xl:grid-cols-3 xl:place-content-center">
      <div className="flex flex-col justify-between rounded-3xl bg-white p-10 shadow-2xl dark:bg-black dark:text-white sm:bg-red-400 md:bg-teal-400">
        <span className="text-3xl font-semibold">Select Item</span>
        <ul>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="my-2 flex justify-between only:bg-red-100 odd:bg-blue-100 even:bg-gray-100 dark:text-white dark:odd:bg-gray-400 dark:even:bg-gray-500"
            >
              <span className="text-gray-500 dark:text-gray-100">
                Grey Chair
              </span>
              <span className="font-semibold "> $19</span>
            </div>
          ))}
        </ul>
        <ul>
          {["a", "b", "c", ""].map((c, i) => (
            <li className="bg-red-500 py-3 empty:hidden" key={i}>
              {c}
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t-2 border-dashed pt-2">
          <span>Total</span>
          <span className="font-semibold ">$10</span>
        </div>
        <button className="mx-auto mt-5 block w-1/2 rounded-xl bg-blue-500 p-3 text-center text-white hover:bg-teal-500 hover:text-black focus:text-red-500 active:bg-yellow-500 dark:border dark:border-white dark:bg-black dark:hover:bg-white">
          Checkout
        </button>
      </div>
      <div className="group overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-blue-500 p-6 pb-14 xl:pb-40">
          <span className="text-2xl text-white">Profile</span>
        </div>
        <div className="relative -top-10 rounded-3xl bg-white p-6">
          <div className="relative -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-gray-400 group-hover:bg-red-500" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">2,310</span>
            </div>
          </div>
          <div className="relative -mt-10 -mb-5 flex flex-col items-center">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">USA</span>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-10 shadow-2xl lg:col-span-2 xl:col-span-1">
        <div className="mb-5 flex items-center justify-between">
          <span>←</span>
          <div className="space-x-3">
            <span>⭐️ 4.9</span>
            <span className="rounded-md p-2 shadow-md">❤️</span>
          </div>
        </div>
        <div className="mb-5 h-72 bg-zinc-400" />
        <div className="flex flex-col">
          <span className="text-xl font-medium">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex items-center justify-between">
            <div className="space-x-2">
              {/* 버튼 사이에 공간은 2준거!*/}
              <button className="h-5 w-5 rounded-full bg-yellow-500 bg-opacity-50 ring-yellow-500 ring-offset-2 transition focus:ring-2"></button>
              <button className="h-5 w-5 rounded-full bg-indigo-500 bg-opacity-50 ring-indigo-500 ring-offset-2 transition focus:ring-2"></button>
              <button className="h-5 w-5 rounded-full bg-teal-500 bg-opacity-50 ring-teal-500 ring-offset-2 transition focus:ring-2"></button>
            </div>
            <div className="flex items-center space-x-5">
              <button className="flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-200 p-1.5 text-xl font-medium text-gray-500">
                -
              </button>
              <button>1</button>
              <button className="flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-200 p-1.5 text-xl font-medium text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3 font-medium">$450</span>
            <button className="rounded-2xl bg-blue-500 py-2 px-5 text-center text-white">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <form className="flex flex-col space-y-2  p-5 ">
        <input
          type="text"
          required
          placeholder="Username"
          className="peer rounded-md border border-gray-400 p-1 "
        />
        <span className="hidden peer-invalid:block peer-invalid:text-red-500">
          This input is invalid
        </span>
        <span className="hidden peer-valid:block peer-valid:text-white">
          Awesome username
        </span>
        <span className="hidden peer-hover:block peer-hover:text-amber-500">
          Hello
        </span>
        <input type="submit" value="Login" className="bg-white" />
      </form>
      <div className="flex flex-col space-y-2 p-5">
        <details className="select-none open:bg-orange-400 open:text-white">
          <summary className="cursor-pointer selection:bg-indigo-500 selection:text-white">
            what is your fav food? 참고 : section: modifier는 details 태그에서
            selection-none이 없을때 먹음!
          </summary>
          <span>김치</span>
        </details>
        <input
          type="file"
          className="file:cursor-wait file:rounded-md file:border-0 file:bg-violet-400 file:px-2 file:text-white file:transition-colors file:hover:border-0 file:hover:border-purple-400 file:hover:bg-white file:hover:text-violet-400"
        ></input>
      </div>
    </div>
  );
}
