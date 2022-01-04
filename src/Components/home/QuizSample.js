import { motion } from "framer-motion";
import ScrollContainer from "react-indiana-drag-scroll";

const QuizCard = ({ ...props }) => {
  return (
    <motion.div
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
      className="h-full w-64 min-w-[16rem] bg-primary-100 mx-4 first:ml-0 last:mr-0 rounded-lg shadow-sm active:cursor-grabbing"
    ></motion.div>
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
