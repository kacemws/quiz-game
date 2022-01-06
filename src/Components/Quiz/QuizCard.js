import { motion } from "framer-motion";
import { Heading, Subheading } from "..";
import { StarIcon, ClipboardListIcon } from "@heroicons/react/outline/";

export const QuizCard = ({
  quiz,
  list = true,
  onClick = (_) => {},
  ...props
}) => {
  return (
    <motion.div
      key={quiz.id}
      initial={{ opacity: 0, skewX: -25, scale: 0.75 }}
      whileInView={{
        opacity: 1,
        skewX: 0,
        scale: 1,
        transition: {
          duration: 0.25,
          ease: "easeIn",
        },
      }}
      className={`flex flex-col justify-center items-center h-full min-w-[${
        list ? "16rem" : "12rem"
      }] bg-primary-300 ${
        list ? "mx-4" : ""
      } first:ml-0 last:mr-0 rounded-lg shadow-sm hover:cursor-pointer active:cursor-grabbing`}
      onClick={() => onClick(quiz)}
    >
      <Heading inverted>{quiz?.name}</Heading>
      <div className="my-2 w-full bg-red flex justify-evenly items-center">
        <div className="flex flex-col items-center">
          <StarIcon className="w-10 h-10 my-2 text-whiteText-300" />
          <Subheading>{quiz?.rating / (quiz?.numberofVotes ?? 1)}</Subheading>
        </div>
        <div className="flex flex-col items-center">
          <ClipboardListIcon className="w-10 h-10 my-2 text-whiteText-300" />
          <Subheading>{quiz?.numberOfPlays ?? 0}</Subheading>
        </div>
      </div>
    </motion.div>
  );
};
