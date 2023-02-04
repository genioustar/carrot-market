import { cls } from "@/libs/client/utils";

interface MessageProps {
  reversed?: boolean;
  message: string;
  avataUrl?: string;
}

export default function Message({
  reversed = false,
  message,
  avataUrl,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex items-start space-x-2",
        reversed ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      <div className="h-8 w-8 rounded-full bg-slate-200" />
      <p className="border-md w-1/2 break-words rounded-md border border-gray-300 p-2 text-sm text-gray-700">
        {message}
      </p>
    </div>
  );
}
