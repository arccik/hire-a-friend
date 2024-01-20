import React from "react";
import Image from "next/image";

import { Chip } from "@nextui-org/react";
import type { User } from "@prisma/client";
import Head from "next/head";
import { FaCity } from "react-icons/fa";
import ReportViolating from "./RepotViolating";
import { useSession } from "next-auth/react";

type PropType = {
  data: User;
};

export default function CustomerProfile({ data }: PropType) {
  const { data: userSession } = useSession();
  return (
    <section className="m-2 flex place-content-center md:m-10">
      <Head>
        <title>Custumer Profile Page</title>
      </Head>
      {userSession?.user && userSession.user.id !== data.id && (
        <div className="absolute right-5">
          <Chip variant="dot" color="primary">
            Customer Profile
          </Chip>
        </div>
      )}
      <div className="mx-auto my-10 max-w-lg rounded-lg bg-white p-5 shadow-md">
        {data.image && (
          <Image
            width={128}
            height={128}
            className="mx-auto h-32 w-32 rounded-full"
            src={data.image}
            alt="Profile picture"
          />
        )}
        <h2 className="mt-3 text-center text-2xl font-semibold">{data.name}</h2>
        <p className="mt-1 text-center text-gray-600">{data.experties}</p>

        {/* <div className="mt-5 flex justify-center">
          <a href="#" className="mx-3 text-blue-500 hover:text-blue-700">
            Twitter
          </a>
          <a href="#" className="mx-3 text-blue-500 hover:text-blue-700">
            LinkedIn
          </a>
          <a href="#" className="mx-3 text-blue-500 hover:text-blue-700">
            GitHub
          </a>
        </div> */}
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Bio</h3>
          <p className="mt-2 text-gray-600">
            {data.about ? data.about : "No bio available"}
          </p>
        </div>
        {data.city && (
          <Chip
            startContent={<FaCity size={18} />}
            className="mt-5 p-2"
            variant="flat"
          >
            {data.city}
          </Chip>
        )}
        <ReportViolating />
      </div>
    </section>
  );
};




