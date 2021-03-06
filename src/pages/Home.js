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

export const Home = ({ ...props }) => {
  const navigate = useNavigate();
  const [, setStates] = useAtom(statesAtom);
  const [, setTypes] = useAtom(typesAtom);
  const [, setDifficulties] = useAtom(difficultiesAtom);
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getStatuses().then(({ data }) => {
      const states = Object.keys(data).map((label) => {
        return {
          label,
          value: data[label],
        };
      });
      getTypes().then(({ data }) => {
        const types = Object.keys(data).map((label) => {
          return {
            label,
            value: data[label],
          };
        });
        getDifficulties().then(({ data }) => {
          const difficulties = Object.keys(data).map((label) => {
            return {
              label,
              value: data[label],
            };
          });
          getPaginatedPublishedQuizzes(1, 10).then((resp) => {
            setQuizzes(resp);
            setStates(states);
            setTypes(types);
            setDifficulties(difficulties);
            setLoading(false);
          });
        });
      });
    });
  }, [setStates, setTypes, setDifficulties, setQuizzes]);
  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <div className="min-h-full w-full overflow-x-hidden">
          <section className="flex flex-col md:flex-row justify-between items-center my-4">
            <img src={topStripe} className="absolute -right-0" alt="stripe" />
            <HomeDescription
              title="Les quizs n'ont jamais ??tait si fun !"
              description="D??fiez vos ami(e)s, entrenez vous, vous d??cidez ! DOTNET vous offre la possibilit?? de jouer ?? des quizs fais par notre communaut??, ou m??me les votres !"
              buttonContent="Commencer d??s maintenant !"
              x={-200}
            />
            <HomeImage
              img={ready}
              title="Les quizs n'ont jamais ??tait si fun !"
              x={200}
            />
          </section>
          {/* ********* */}
          <section className="flex flex-col md:flex-row justify-between items-center my-12">
            <img src={bottomStripes} className="absolute left-0" alt="stripe" />
            <img src={circle} className="absolute right-0" alt="stripe" />
            <HomeImage
              img={topOfBooks}
              title="Les quizs n'ont jamais ??tait si fun !"
              x={-200}
            />
            <HomeDescription
              title="Mettez vos amis ?? l'??preuve !"
              description={
                "DOTQUIZ vous offre la possibilit?? de cr??er vos propre quizs ! Mettez vos amis ?? l'??preuve que sa soit dans de la culture g??n??rale Ou sur votre relation !"
              }
              buttonContent="Cr??er un quiz"
              buttonClick={(_) => {
                setOpen(true);
              }}
              x={200}
            />
          </section>
          {/* ********* */}
          <section className="flex flex-col justify-center items-center my-4">
            <img src={bottom} className="absolute right-0" alt="stripe" />
            <HomeImage
              img={universe}
              title="Les quizs n'ont jamais ??tait si fun !"
              y={100}
            />
            <PageTitle>
              Plonger dans un monde rempli de nouveaux d??fis
            </PageTitle>
            <QuizSample quizzes={quizzes.items} />
          </section>
          {/* ********* */}
          <div className="py-4 w-full flex items-center justify-center">
            <OutlinedButton
              title="D??couvrir plus"
              onClick={(_) => {
                navigate("/quizzes/all");
              }}
            />
          </div>
        </div>
      )}
      )
      <AddQuizModal open={open} setOpen={setOpen} />
    </>
  );
};
