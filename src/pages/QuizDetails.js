import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { typesAtom, difficultiesAtom } from "../data";
import { getSerialisedQuizById } from "../services";
import {
  Body,
  Heading,
  Loader,
  OutlinedButton,
  PageTitle,
} from "../Components";

import illustration from "../assets/images/illustrations/prepare.svg";

export const QuizDetails = () => {
  const { id } = useParams();

  const [types] = useAtom(typesAtom);
  const [difficulties] = useAtom(difficultiesAtom);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    getSerialisedQuizById(difficulties, types, id)
      .then((resp) => {
        setQuiz(resp);
        setLoading(false);
      })
      .catch((_) => {
        navigate(-1);
      });
  }, [difficulties, types, id, navigate, setQuiz]);

  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          <img
            src={illustration}
            alt="waiting for you to start the app !"
            className="h-96 my-4"
          />
          <PageTitle>Lance toi dans l'aventure !</PageTitle>
          <Body>
            Tu veux tester tes compétences ? Avoir du fun?{" "}
            <span className="text-primary-300 text-base font-bold">
              {quiz?.name}
            </span>{" "}
            est fait pour toi !
          </Body>
          <div className="h-8" />
          <PageTitle>Bon à savoir !</PageTitle>
          <div className="my-6 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center">
            <div className="flex flex-col items-center">
              <Heading>Ce quiz a été joué</Heading>
              <div className="h-4" />
              <Body>{quiz?.numberOfPlays} fois</Body>
            </div>
            <div className="flex flex-col items-center">
              <Heading>Ce quiz a reçu une note de</Heading>
              <div className="h-4" />
              <Body>{quiz?.rating / (quiz?.numberofVotes ?? 1)}</Body>
            </div>
            <div className="flex flex-col items-center">
              <Heading>Ce quiz est considéré</Heading>
              <div className="h-4" />
              <Body>{quiz?.difficulty?.label}</Body>
            </div>
          </div>
          <OutlinedButton title="Commence à jouer !" />
          <div className="h-6" />
        </div>
      )}
    </>
  );
};
