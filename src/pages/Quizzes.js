import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { statesAtom, typesAtom, difficultiesAtom, quizzesAtom } from "../data";
// import { getStatuses, getTypes, getDifficulties } from "../api";
import { Loader, NoContent, QuizCard, AddQuizModal } from "../Components";
import { getAllQuizzes } from "../services";

export const Quizzes = ({ ...props }) => {
  //   const [states] = useAtom(statesAtom);
  //   const [types] = useAtom(typesAtom);
  //   const [difficulties] = useAtom(difficultiesAtom);
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllQuizzes(page, 10).then((resp) => {
      console.log({ resp });
      setQuizzes(resp);
      setLoading(false);
      setInnerLoading(false);
    });
  }, [page, setLoading, setInnerLoading, setQuizzes]);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {quizzes.items.map((quiz) => {
                return (
                  <div key={quiz.id} className="h-64">
                    <QuizCard quiz={quiz} list={false} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      ){/* <Update open={open} setOpen={setOpen} />s */}
    </>
  );
};
