import Title from "../../../ui/Title";
import { Button } from "@nextui-org/react";
import { activities } from "~/data/activities-list";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function Activities() {
  const [showMore, setShowMore] = useState(false);
  const toDisplay = showMore ? activities : activities.slice(0, 4);
  return (
    <section className="mt-10 min-h-[500px] md:mt-24">
      <div className="container mx-auto text-center">
        <Title text="Activities" className="text-xs" />
        <p className="text-sm text-gray-500">
          List of activities that you can do with hired friend
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <AnimatePresence>
            {toDisplay.map(({ id, title, description, Icon }) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={id}
                className="m-5 rounded-xl border p-4 shadow-blue-50 hover:shadow-inner"
              >
                <div className=" mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                  <Icon size="sm" className="text-green-200" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <Button
          className="m-4 mx-auto "
          variant="bordered"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "See Less" : "See More"}
        </Button>
      </div>
    </section>
  );
}
