import { cn } from "~/lib/utils";

export default function Title({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      // className={"text-5xl font-extrabold" + (className ? " " + className : "")}
      className={cn(className, { "text-5xl font-extrabold": !className })}
    >
      {/* <span className="bg-gradient-to-r from-pink-900 to-violet-900 bg-clip-text text-transparent"> */}
      <span className="animate-text bg-gradient-to-r from-orange-700 via-yellow-500 to-orange-500 bg-clip-text text-2xl font-black text-transparent drop-shadow-xl md:text-5xl">
        {text}
      </span>
    </div>
  );
}
