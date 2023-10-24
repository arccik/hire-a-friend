import { useRouter } from "next/router";
import { User } from "@nextui-org/react";

export default function Contacts() {
  const router = useRouter();

  const handleCloseButton = (index: string) => {
    const { pathname, query } = router;
    router.query.chat = index;
    void router.replace({ pathname, query }, undefined, { shallow: true });
  };
  return (
    <>
      <div className="flex items-center justify-between overflow-auto border-b p-2">
        <p className="p-3 text-lg font-semibold text-slate-500 md:h-12">
          Contacts
        </p>
      </div>
      <div className="flex overflow-auto md:mt-5 md:flex-col ">
        {Array.from({ length: 100 }).map((_, index) => (
          <User
            onClick={() => handleCloseButton(index.toString())}
            key={index}
            isFocusable
            name={`User ${index}`}
            className="animate-appearance-in cursor-pointer p-2 text-black hover:bg-slate-400 hover:text-slate-600"
            description="Product Designer"
            avatarProps={{
              src: "/assets/images/logo-circle.png",
            }}
          />
        ))}
      </div>
    </>
  );
}

