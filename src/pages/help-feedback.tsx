import { Accordion, AccordionItem } from "@nextui-org/react";

const questionsAndAnswers = [
  {
    question: "What is Rent My Time?",
    answer:
      "Rent My Time is a platform that connects individuals in the United Kingdom with local companions. It provides a space where you can discover new activities, seek advice, or find a friendly companion for various events",
  },
  {
    question: "How does Rent My Time work ?",
    answer: `To make the most of RentMyTime.co.uk, follow these steps:
  Search for Companions: Look for companions in your UK location.
  Browse Profiles: View profiles, check photos, and learn about interests for free.
  Connect: Register as a member to connect with companions (a small fee applies).
  Messaging and Negotiation: Initiate conversations and negotiate future meetings directly with companions.`,
  },
  {
    question: "What can I use Rent My Time for?",
    answer:
      "People use RentMyTime.co.uk for various reasons, including discovering local insights, finding companions for events, learning new skills or hobbies, making diverse connections, finding dinner or sports companions, getting workout partners, and seeking personal advice.",
  },
  {
    question: "How much does it cost to use Rent My Time?",
    answer:
      "Most companions start at just £10 per hour, with room for negotiation. The platform is exclusively available in the UK.",
  },
  {
    question: "How do I contact companions on Rent My Time?",
    answer:
      "As a registered member, you can securely contact companions by clicking the orange 'Send Message' button on the profile of your chosen companion.",
  },
  {
    question: "Is it free to browse companion profiles?",
    answer:
      "Yes, browsing companion profiles is free. You can explore and discover potential companions without any cost.",
  },
  {
    question: "Can I negotiate the hourly rate with companions?",
    answer:
      "Yes, Rent My Time encourages users to negotiate directly with companions. The initial hourly rate is a starting point, and there is room for discussion.",
  },
  {
    question: "Can I use Rent My Time for commercial purposes?",
    answer:
      "No, Rent My Time is intended for personal use only. It is not intended for commercial use.",
  },
  {
    question:
      "Are there safety measures in place for meetings with companions?",
    answer:
      "While Rent My Time facilitates connections, users are encouraged to prioritize safety. It's advisable to meet in public places, inform someone about your plans, and trust your instincts when arranging meetings.",
  },
  {
    question: "Can I become a companion on Rent My Time?",
    answer:
      "Yes, if you are interested in becoming a companion, you can create a profile on RentMyTime.co.uk and start connecting with individuals seeking companionship.",
  },
  {
    question: "How do I get started on Rent My Time?",
    answer:
      "To begin your journey on RentMyTime.co.uk, browse companion profiles for free and find your ideal friend. Click the orange button on the website to start your search.",
  },
];

export default function MemoPage() {
  return (
    <div>
      <div className="bg-white py-16">
        <div className="container m-auto px-2 text-gray-600 md:px-12 xl:px-6">
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
