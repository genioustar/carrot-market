import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="grid min-h-screen gap-10 space-y-5 bg-slate-400 py-20 px-20">
      <div className="rounded-3xl bg-white p-10 shadow-2xl">
        <span className="text-3xl font-semibold">Select Item</span>
        <div className="my-2 flex justify-between">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold "> $19</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold "> $19</span>
        </div>
        <div className="flex justify-between border-t-2 border-dashed pt-2">
          <span>Total</span>
          <span className="font-semibold ">$10</span>
        </div>
        <div className="mx-auto mt-5 w-1/2 rounded-xl bg-blue-500 p-3 text-center text-white">
          Checkout
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-2xl text-white">Profile</span>
        </div>
        <div className="relative -top-10 rounded-3xl bg-white p-6">
          <div className="relative -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-red-400" />
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
      <div className="rounded-2xl bg-white p-10 shadow-2xl">
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
            <div>
              <input type="radio" />
              <input type="radio" />
              <input type="radio" />
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
    </div>
  );
}
