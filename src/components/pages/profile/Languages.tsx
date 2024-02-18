import { Chip } from "@nextui-org/react";

type PropType = {
  languages: string[] | null;
};

export default function Languages({ languages }: PropType) {
  if (!languages?.length) return null;
  return (
    <>
      <p className="mb-5 mt-5 text-center text-lg font-bold text-orange-500">
        Languages
      </p>

      <div className="md-5 flex flex-wrap justify-center gap-5 md:mb-10">
        {languages.map((language) => (
          <Chip
            key={language}
            variant="dot"
            color="warning"
            className=" border-orange-400"
          >
            {language}
          </Chip>
        ))}
      </div>
    </>
  );
}
