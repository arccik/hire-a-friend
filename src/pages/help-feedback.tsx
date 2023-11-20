// import Image from "next/image";

import { Accordion, AccordionItem } from "@nextui-org/react";

const questionsAndAnswers = [
  { question: "What is your name ?", answer: "My name is john" },
  { question: "What is your age ?", answer: "I am 20 years old" },
  { question: "What is your job ?", answer: "I am a web developer" },
];

export default function MemoPage() {
  return (
    <div>
      <div className="bg-white py-16">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:flex md:gap-6 md:space-y-0 lg:items-center lg:gap-12">
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">
                Help & Feedback
              </h2>
              <p className="text-xs text-slate-400">
                Frequently asked questions
              </p>
            </div>
            <div className="w-full">
              {/* <Image
                src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                alt="image"
                loading="lazy"
                width={600}
                height={300}
              /> */}
              <Accordion variant="shadow">
                {questionsAndAnswers.map((item, index) => (
                  <AccordionItem key={index} title={item.question}>
                    {item.answer}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
