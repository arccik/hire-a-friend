import type { NextApiRequest, NextApiResponse } from "next";
import activities from "~/data/activities.json";
import hobbies from "~/data/hobby-list.json";
import { zodiacSigns } from "~/data/zodiac-sign-list";
import { prisma } from "~/server/db";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const randomNumHobby = () => Math.floor(Math.random() * hobbies.length);
  const randomNumActivity = () => Math.floor(Math.random() * activities.length);
  const { value: hobb } = hobbies[randomNumHobby()]!;
  const { value: acty } = activities[randomNumActivity()]!;

  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then(async (data) => {
      console.log(data);
      const result = await prisma.user.create({
        data: {
          name: data.results[0].name.first,
          email: data.results[0].email,
          password: data.results[0].login.password,
          image: data.results[0].picture.large,
          age: Math.max(18, Math.floor(Math.random() * 60)),
          about: "love ya",
          //   photos: [data.results[0].picture.large],
          city: data.results[0].location.city,
          gender: Math.random() > 0.5 ? "1" : "2",
          activities: [acty],
          hobbies: [hobb],
          experties: hobb,
          price: randomNumActivity(),
          languages: ["English"],
          activated: true,
          userType: "Friend",
          zodiacSign: String(Math.floor(Math.random() * zodiacSigns.length)),
          preferedAgeRange: [18, 99],
        },
      });
      console.log("Created user: ", result);
      res.status(200).json({ message: "Seed completed" });
      return;
    });

  //   prisma.user.createMany({
  //     data: [
  //       {
  //         name: "aa",
  //         email: "XXXXXXXXX",
  //         password: "XXXXXXXXX",
  //         image: "XXXXXXXXX",
  //         age: Math.max(18, Math.floor(Math.random() * 60)),
  //         about: "XXXXXXXXX",
  //         photos: ["XXXXXXXXX", "XXXXXXXXX"],
  //         city: "XXXXXXXXX",
  //         gender: "1",
  //         activities: [acty],
  //         hobbies: [hobb],
  //         experties: hobb,
  //         price: randomNum(),
  //         languages: ["English"],
  //         activated: true,
  //         userType: "Friend",
  //         zodiacSign: String(Math.floor(Math.random() * zodiacSigns.length)),
  //         preferedAgeRange: [18, 99],
  //       },
  //     ],
  //   });
}
