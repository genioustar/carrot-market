import Link from "next/link";

interface FloatingButtonProps {
  children: React.ReactNode;
  href: string;
  [key: string]: any;
}

export default function FloatingButton({
  children,
  href,
  ...rest
}: FloatingButtonProps) {
  return (
    <Link href={href}>
      <button
        {...rest}
        className="fixed bottom-24 right-5 cursor-pointer rounded-full bg-yellow-300 p-3 text-gray-50 shadow-lg transition-colors hover:bg-yellow-400"
      >
        {children}
      </button>
    </Link>
  );
}
