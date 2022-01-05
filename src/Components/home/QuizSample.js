import ScrollContainer from "react-indiana-drag-scroll";
import { QuizCard } from "..";

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
