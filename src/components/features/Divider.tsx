export default function Divider({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={"relative py-4 " + className ?? ""}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-b border-gray-300"></div>
      </div>
      {text && (
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">{text}</span>
        </div>
      )}
    </div>
  );
}
