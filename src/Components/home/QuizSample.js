import { motion } from "framer-motion";
import ScrollContainer from "react-indiana-drag-scroll";
import { Heading, Subheading } from "..";
import { StarIcon, ClipboardListIcon } from "@heroicons/react/outline/";

const QuizCard = ({ quiz, ...props }) => {
  console.log({ quiz });
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
      className="flex flex-col justify-center items-center h-full w-64 min-w-[16rem] bg-primary-300 mx-4 first:ml-0 last:mr-0 rounded-lg shadow-sm active:cursor-grabbing"
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
export const QuizSample = ({ quizzes }) => {
  return (
    <ScrollContainer
      className="mt-4 py-1 w-full h-64 overflow-scroll"
      hideScrollbars={false}
    >
      <div className="h-full flex">
        {quizzes.map((quiz) => (
          <QuizCard quiz={quiz} key={quiz.id} />
        ))}
      </div>
    </ScrollContainer>
  );
};
