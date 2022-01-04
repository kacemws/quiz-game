import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { statesAtom, typesAtom, difficultiesAtom, quizzesAtom } from "../data";
import { getStatuses, getTypes, getDifficulties } from "../api";
import {
  AddQuizModal,
  HomeDescription,
  HomeImage,
  Loader,
  OutlinedButton,
  PageTitle,
  QuizSample,
} from "../Components";
import ready from "../assets/images/illustrations/ready.png";
import topOfBooks from "../assets/images/illustrations/top-of-books.png";
import universe from "../assets/images/illustrations/universe.png";
import topStripe from "../assets/images/shapes/centred-shape.svg";
import bottomStripes from "../assets/images/shapes/bottom-stripes.svg";
import circle from "../assets/images/shapes/half-circle.svg";
import bottom from "../assets/images/shapes/bottom.svg";
import { getPaginatedPublishedQuizzes } from "../services";

export const Quizzes = ({ ...props }) => {
  const navigate = useNavigate();
  const [states] = useAtom(statesAtom);
  const [types] = useAtom(typesAtom);
  const [difficulties] = useAtom(difficultiesAtom);
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [setQuizzes]);
  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <div className="min-h-full w-full overflow-x-hidden"></div>
      )}
      )
      <AddQuizModal open={open} setOpen={setOpen} />
    </>
  );
};
