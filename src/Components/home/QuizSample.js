import ScrollContainer from "react-indiana-drag-scroll";

const QuizCard = () => {
  return (
    <div className="h-full w-64 min-w-[16rem] bg-primary-100 mx-4 first:ml-0 last:mr-0 rounded-lg shadow-sm active:cursor-grabbing"></div>
  );
};
export const QuizSample = ({ quizzes }) => {
  let data = ["", "", "", "", "", "", "", "", "", 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <ScrollContainer className="mt-4 py-1 w-full h-64" hideScrollbars={false}>
      <div className="h-full flex">
        {data.map((_) => (
          <QuizCard />
        ))}
      </div>
    </ScrollContainer>
  );
};
