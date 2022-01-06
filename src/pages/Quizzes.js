import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { statesAtom, quizzesAtom } from "../data";
import {
  Loader,
  NoContent,
  QuizCard,
  AddQuizModal,
  UpdateQuizModal,
  OutlinedButton,
  PopoverComponent,
} from "../Components";
import { getAllQuizzes, totalPages } from "../services";
import { FilterIcon } from "@heroicons/react/outline";

export const Quizzes = ({ ...props }) => {
  const [states] = useAtom(statesAtom);

  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("");

  // add quiz
  const [open, setOpen] = useState(false);

  // update quiz
  const [update, setUpdate] = useState(false);
  // selected quiz
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    getAllQuizzes("", 1, 10).then((resp) => {
      setQuizzes(resp);
      setLoading(false);
      setInnerLoading(false);
    });
  }, [setLoading, setInnerLoading, setQuizzes]);

  const paginate = async () => {
    setInnerLoading(true);
    const { items, count } = await getAllQuizzes(state, page + 1, 10);

    const aux = Array.from(new Set([...quizzes.items, ...items]));
    setQuizzes({
      items: aux,
      count,
    });
    setPage((page) => page + 1);
    setInnerLoading(false);
  };

  const changeFilter = async (state) => {
    setInnerLoading(true);
    const resp = await getAllQuizzes(state, 1, 10);
    setQuizzes(resp);
    setState(state);
    setPage(1);
    setInnerLoading(false);
  };

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <div className="min-h-full w-full overflow-x-hidden">
          {quizzes.items.length === 0 ? (
            <>
              <NoContent
                title="Booo !"
                message="Aucun quiz n'a été"
                highlight="trouvé"
                buttonTitle="Créer le votre"
                clickEvent={(_) => {
                  setOpen(true);
                }}
              />
              <AddQuizModal open={open} setOpen={setOpen} />
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-full h-16 flex items-center justify-end">
                <PopoverComponent
                  options={[
                    { label: "Supprimer les filtres", value: "" },
                    ...states,
                  ]}
                  setItem={changeFilter}
                  button={
                    <FilterIcon
                      className={`h-6 w-6 ${
                        state === "" ? "text-gray-400" : "text-primary-300"
                      } cursor-pointer`}
                    />
                  }
                />
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-stretch">
                {quizzes.items.map((quiz) => {
                  return (
                    <div key={quiz.id} className="h-64">
                      <QuizCard
                        quiz={quiz}
                        list={false}
                        onClick={(quiz) => {
                          const stateValue = states.find(
                            (state) => state.value === quiz?.state
                          );
                          if (stateValue.label !== "DRAFT") {
                            navigate(`/quizzes/all/${quiz?.id}`);
                          } else {
                            setSelectedQuiz(quiz);
                            setUpdate(true);
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 mb-2">
                {page !== totalPages(10, quizzes.count) && (
                  <OutlinedButton
                    title="Afficher plus"
                    disabled={innerLoading || loading}
                    loading={innerLoading || loading}
                    onClick={(_) => {
                      paginate();
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <UpdateQuizModal quiz={selectedQuiz} open={update} setOpen={setUpdate} />
    </>
  );
};
