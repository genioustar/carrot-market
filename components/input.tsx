import { UseFormRegisterReturn } from "react-hook-form";
interface InputProps {
  id: string;
  label: string;
  kind?: "text" | "price" | "phone";
  register: UseFormRegisterReturn;
  [key: string]: any; //여기에 type이나 required 같은 attr이 들어있는거!
}

export default function Input({
  label,
  id,
  kind = "text",
  register,
  ...rest
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {kind === "text" ? (
        <div className="relative flex items-center rounded-md shadow-sm">
          <input
            id={id}
            className="w-full appearance-none rounded-md border border-gray-300 py-2 px-2 placeholder-gray-400 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
            {...register}
            {...rest}
          />
        </div>
      ) : null}
      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex select-none items-center justify-between rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 ">
            +82
          </span>
          <input
            id={id}
            className="w-full appearance-none rounded-xl rounded-l-none border border-gray-300 py-2 px-2 placeholder-gray-400 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
            {...register}
            {...rest}
          />
        </div>
      ) : null}
      {kind === "price" ? (
        <div className="relative flex items-center rounded-md shadow-sm">
          <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
            <span className="text-sm text-gray-500">$</span>
          </div>
          <input
            className="w-full appearance-none rounded-md border border-gray-300 py-2 px-2 pl-7 text-sm placeholder-gray-400 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
            id={id}
            {...register}
            {...rest}
          />
          <div className="pointer-events-none absolute right-0 flex items-center pr-3">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
