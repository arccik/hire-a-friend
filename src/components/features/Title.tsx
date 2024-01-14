import { cn } from "~/lib/utils";

type TitleProps = {
  text: string;
  className?: string;
};

export default function Title({ text, className }: TitleProps) {
  return (
    <div className={cn(className, { "text-5xl font-extrabold": !className })}>
      <span className="animate-text bg-gradient-to-r from-orange-700 via-yellow-500 to-orange-500 bg-clip-text text-2xl font-black text-transparent drop-shadow-xl md:text-5xl">
        {text}
      </span>
    </div>
  );
}
