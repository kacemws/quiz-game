import ScrollContainer from "react-indiana-drag-scroll";
import { useNavigate } from "react-router-dom";
import { QuizCard } from "..";

export const QuizSample = ({ quizzes }) => {
  const navigate = useNavigate();
  return (
    <ScrollContainer
      className="mt-4 py-1 w-full h-64 overflow-scroll"
      hideScrollbars={false}
    >
      <div className="h-full flex">
        {quizzes.map((quiz) => (
          <QuizCard
            quiz={quiz}
            key={quiz.id}
            onClick={(_) => {
              navigate(`/quizzes/all/${quiz?.id}`);
            }}
          />
        ))}
      </div>
    </ScrollContainer>
  );
};
