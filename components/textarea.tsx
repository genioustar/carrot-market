interface TextAreaProps {
  label?: string; // 라벨은 있어도 되고 없어도 됨!
  name?: string; // 라벨이 있어도 없어도 되니까 label과 연결해주는 name도 마찬가지!
  [key: string]: any;
}

export default function TextArea({ label, name, ...rest }: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}

      <textarea
        id={name}
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
        rows={4}
        {...rest}
      />
    </div>
  );
}
