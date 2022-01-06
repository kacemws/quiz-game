import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { typesAtom, difficultiesAtom } from "../data";
import { getSerialisedQuizById } from "../services";
import {
  Heading,
  Loader,
  OutlinedButton,
  Progress,
  Step,
  Title,
} from "../Components";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/outline";

export const Questions = () => {
  const { id } = useParams();

  const [types] = useAtom(typesAtom);
  const [difficulties] = useAtom(difficultiesAtom);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getSerialisedQuizById(difficulties, types, id)
      .then((resp) => {
        setQuiz(resp);
        setLoading(false);
      })
      .catch((_) => {
        navigate(`/quizzes/all/${id}`);
      });
  }, [difficulties, types, id, navigate, setQuiz]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }, [current]);

  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <div className="min-h-full w-full overflow-x-hidden flex flex-col">
          <Progress
            current={current}
            total={quiz?.quizQuestions?.questions?.length}
          />
          <div className="my-2">
            <Heading color="text-gray-400">
              <div
                className="flex w-fit hover:cursor-pointer transition duration-200 ease-in-out"
                onClick={(_) => {
                  if (current === 0) navigate(-1);
                  setCurrent((current) => current - 1);
                }}
              >
                <ArrowNarrowLeftIcon className="mr-4 h-6 w-6" />
                <>{`${
                  current === 0 ? "Quitter le quiz" : "Question Précédente"
                }`}</>
              </div>
            </Heading>
          </div>
          <div className="w-full flex-1 flex flex-col items-center">
            <div className="my-4">
              <Title color="text-primary-300">
                {`Question ${current + 1}/${
                  quiz?.quizQuestions?.questions?.length
                }`}
              </Title>
            </div>
            <Step
              question={quiz?.quizQuestions?.questions[current]}
              key={quiz?.quizQuestions?.questions[current]?.id}
            />
          </div>
          <div className="mt-4 w-full flex justify-center">
            {current !== quiz?.quizQuestions?.questions?.length - 1 && (
              <OutlinedButton
                title={
                  <div className="flex">
                    <>Prochaine Question !</>
                    <ArrowNarrowRightIcon className="ml-4 h-6 w-6" />
                  </div>
                }
                onClick={(_) => {
                  setCurrent((current) => current + 1);
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
