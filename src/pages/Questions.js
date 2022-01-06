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
import { useForm } from "react-hook-form";

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

  const {
    register,
    unregister,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange" }); //form validation

  const [errorSeen, setErrorSeen] = useState(false);
  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <form
          className="min-h-full w-full overflow-x-hidden flex flex-col"
          onSubmit={handleSubmit((formData) => {
            try {
              // pass to next
              if (errorSeen) {
                setErrorSeen(false);
                Object.keys(formData).forEach((key) => {
                  unregister(key);
                });
                if (current !== quiz?.quizQuestions?.questions?.length - 1) {
                  setCurrent((current) => current + 1);
                } else {
                  navigate("/");
                }
                return;
              }

              const question = quiz?.quizQuestions?.questions[current];
              if (question?.type?.value === 0) {
                setErrorSeen(true);
                Object.keys(formData).forEach((key) => {
                  const answer = question?.answers?.find(
                    (answer) => answer.id === key
                  );
                  if (formData[key] !== answer.content)
                    setError(key, {
                      message: `Faux, la réponse est : ${answer?.content}`,
                    });
                });
              } else {
                let foundValid = undefined;
                Object.keys(formData).forEach((key) => {
                  if (
                    ![null, undefined].includes(formData[key]) &&
                    formData[key] &&
                    typeof formData[key] === "boolean"
                  ) {
                    console.log(formData[key]);
                    // to make sure that only 1 option is selected
                    if (foundValid) {
                      throw new Error(
                        "Vous ne pouvez séléctionner qu'une seule option"
                      );
                    }
                    foundValid = true;
                  }
                });
                if (!foundValid) {
                  throw new Error("Vous devez séléctionner une option");
                }
                setErrorSeen(true);

                Object.keys(formData).forEach((key) => {
                  const answer = question?.answers?.find(
                    (answer) => answer.id === key
                  );
                  if (answer) {
                    console.log({ answer, choice: formData[key] });
                    if (answer.valid) {
                      setError(key, {
                        message: `Ceci est le bon choix !`,
                      });
                    }
                    if (formData[key] !== answer.valid && !answer.valid) {
                      setError(key, {
                        message: `Ceci est le mauvais choix !`,
                      });
                    }
                  }
                });
              }
            } catch (error) {
              setError("checkbox", {
                message: error?.message,
              });
            }
          })}
        >
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
              errors={errors}
              register={register}
              disabled={errorSeen}
            />
          </div>
          <div className="mt-4 w-full flex justify-center">
            <OutlinedButton
              onClick={() => {
                clearErrors();
              }}
              title={
                <div className="flex">
                  <>
                    {!errorSeen
                      ? "Vérifier"
                      : current !== quiz?.quizQuestions?.questions?.length - 1
                      ? "Prochaine Question !"
                      : "Revenier à la page d'accueil"}
                  </>
                  <ArrowNarrowRightIcon className="ml-4 h-6 w-6" />
                </div>
              }
            />
          </div>
        </form>
      )}
    </>
  );
};
