import { useState } from "react";
import { useAtom } from "jotai";
import { statesAtom, quizzesAtom } from "../../data";
import { PrimaryButton, OutlinedButton, TertiaryButton } from "../";
import waiting from "../../assets/images/illustrations/waiting.png";

import { updateQuiz } from "../../services";

export const Recap = ({ setStep, data, onClose }) => {
  const [states] = useAtom(statesAtom);
  const [, setQuizzes] = useAtom(quizzesAtom);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      <img className="h-52" src={waiting} alt="waiting for your action !" />
      <div className="w-full flex items-center justify-between">
        <TertiaryButton
          title="Précédent"
          disabled={loading}
          loading={loading}
          onClick={(_) => {
            setStep(2);
          }}
        />
        <div className="flex">
          <div className="mr-2">
            <OutlinedButton
              title="Sauvegarder"
              disabled={loading}
              loading={loading}
              onClick={async (_) => {
                try {
                  setLoading(true);
                  await updateQuiz(
                    {
                      ...data,
                      state: states.find((state) => state?.label === "DRAFT"),
                    },
                    setQuizzes
                  );
                  onClose();
                } catch (error) {
                  console.log({ error });
                }
              }}
            />
          </div>
          <PrimaryButton
            title="Publier"
            disabled={loading}
            loading={loading}
            onClick={async (_) => {
              try {
                setLoading(true);
                await updateQuiz(
                  {
                    ...data,
                    state: states.find((state) => state?.label === "PUBLISHED"),
                  },
                  setQuizzes
                );
                onClose();
              } catch (error) {
                console.log({ error });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
