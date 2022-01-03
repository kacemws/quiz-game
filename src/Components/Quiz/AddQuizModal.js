import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { typesAtom, difficultiesAtom } from "../../data";
import {
  Modal,
  Input,
  Steps,
  PrimaryButton,
  OutlinedButton,
  TertiaryButton,
  Select,
  Checkbox,
} from "../";
import { MinusIcon } from "@heroicons/react/outline";
import waiting from "../../assets/images/illustrations/waiting.png";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const InfosStep = ({ setStep, data, setData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: data?.name,
    },
  }); //form validation

  return (
    <form
      onSubmit={handleSubmit((formData) => {
        try {
          setData({ ...data, ...formData });
          setStep(2);
        } catch (error) {
          console.log({ error });
        }
      })}
    >
      <Input
        label="Nom du quiz"
        name="name"
        defaultValue={data?.name}
        disabled={data?.name}
        error={errors?.name ? "obligatoire" : ""}
        register={register}
        required
      />
      <Input
        label="Mot de passe"
        defaultValue={data?.password}
        underText="Protéger votre quiz avec un mot de passe (minimum 6 dont 1 minuscule, 1 majuscule, 1 chiffre)"
        password
        name="password"
        type="password"
        error={
          errors?.password?.type === "required"
            ? "obligatoire"
            : errors?.password?.type === "minLength"
            ? "Taille non respéctée"
            : errors?.password?.type === "pattern"
            ? "Consignes non respectées"
            : ""
        }
        register={register}
        minLength={6}
        pattern={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&-+]{6,}$/}
        required
      />
      <div className="w-full flex justify-end">
        <OutlinedButton title="Suivant" type="primary" />
      </div>
    </form>
  );
};

const QuestionsQuiz = ({ setStep, data, setData }) => {
  const {
    register,
    unregister,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" }); //form validation

  useEffect(() => {
    if (data.questions) {
      setQuestions(data.questions);
    }
  }, [data]);
  const [types] = useAtom(typesAtom);
  const [difficulties] = useAtom(difficultiesAtom);
  const [difficulty, setDifficulty] = useState(difficulties[0]);

  const [questions, setQuestions] = useState([
    {
      id: makeid(6),
      question: "",
      type: {
        label: "INPUT",
        value: 0,
      },
      propositions: [
        {
          id: makeid(4),
          valid: true,
          content: "",
        },
      ],
    },
  ]);

  const addQuestion = () => {
    setQuestions((questions) => {
      let aux = [...questions];
      aux.push({
        id: makeid(6),
        question: "",
        type: {
          label: "INPUT",
          value: 0,
        },
        propositions: [
          {
            id: makeid(4),
            valid: true,
            content: "",
          },
        ],
      });
      return aux;
    });
  };

  const changeQuestionType = (id, value) => {
    const index = questions.findIndex((question) => question.id === id);
    const aux = [...questions];
    aux[index].type = value;
    aux[index].propositions.forEach((proposition) => {
      unregister(`question-${id}-proposition-${proposition.id}`);
    });
    aux[index].propositions = [{ ...aux[index].propositions[0], valid: true }];
    setQuestions(aux);
  };

  const removeQuestion = (id) => {
    const index = questions.findIndex((question) => question.id === id);
    const aux = [...questions];
    aux[index].propositions.forEach((proposition) => {
      unregister(`question-${id}-proposition-${proposition.id}`);
    });
    unregister(`question-${id}`);

    aux.splice(index, 1);
    setQuestions(aux);
  };

  const addProposition = (questionId) => {
    const question = questions.findIndex(
      (question) => question.id === questionId
    );
    const aux = [...questions];

    aux[question].propositions.push({
      id: makeid(4),
      valid: false,
      content: "",
    });
    setQuestions(aux);
  };

  const removeProposition = (questionId, propositionId) => {
    const question = questions.findIndex(
      (question) => question.id === questionId
    );
    const aux = [...questions];
    const auxQuestion = { ...aux[question] };

    const index = auxQuestion.propositions.findIndex(
      (proposition) => proposition.id === propositionId
    );

    auxQuestion.propositions.splice(index, 1);

    aux[question] = auxQuestion;
    unregister(`question-${questionId}-proposition-${propositionId}`);
    setQuestions(aux);
  };

  console.log({ errors });

  return (
    <form
      onSubmit={handleSubmit((formData) => {
        try {
          const aux = [...questions];
          // transforming to readble object
          aux.forEach((question) => {
            question.question = formData[`question-${question.id}`];
            // to verify that at least one option was checked by question
            let foundValid = undefined;
            question.propositions.forEach((proposition) => {
              proposition.valid =
                question.type.value === 0
                  ? true
                  : formData[
                      `question-${question.id}-proposition-${proposition.id}-valid`
                    ];
              proposition.content =
                formData[
                  `question-${question.id}-proposition-${proposition.id}`
                ];
              if (proposition.valid) {
                // to make sure that only 1 option is selected
                if (foundValid) {
                  throw new Error(
                    JSON.stringify({
                      question: question.id,
                      message:
                        "Vous ne pouvez séléctionner qu'une seule option",
                    })
                  );
                }
                foundValid = true;
              }
            });
            if (!foundValid) {
              throw new Error(
                JSON.stringify({
                  question: question.id,
                  message: "Veuillez séléctionner une option",
                })
              );
            }
          });
          // go to next step
          setData({ ...data, questions: [...aux], difficulty });
          setStep(3);
        } catch ({ message }) {
          const error = JSON.parse(message);
          if (error.question) {
            setError(`question-${error.question}`, {
              message: error.message,
              type: "options",
            });
          }
          console.log({ error });
        }
      })}
    >
      <div className="questions mb-4 max-h-[60vh] overflow-y-auto px-2">
        <Select
          label="Difficulté du quiz"
          options={difficulties}
          selected={difficulty}
          setSelected={setDifficulty}
        />
        {questions.map((question, index) => {
          return (
            <div className="w-full my-2" key={question.id}>
              {/* the question itself */}
              <Input
                className="flex-1"
                label="Question"
                name={`question-${question.id}`}
                defaultValue={question.question}
                error={
                  errors[`question-${question.id}`]
                    ? errors[`question-${question.id}`].message || "obligatoire"
                    : ""
                }
                register={register}
                aside={
                  questions.length !== 1 && (
                    <div
                      className="cursor-pointer h-11 w-11 rounded bg-rose-600 ml-2 border-red-500 ring-red-200 focus:border-red-300 outline-none flex items-center justify-center text-sm"
                      onClick={(e) => {
                        // in case i add any click event in the input component
                        e.preventDefault();
                        removeQuestion(question.id);
                      }}
                    >
                      <MinusIcon className="w-6 h-6" />
                    </div>
                  )
                }
                required
              />

              {/* type of answers */}
              <Select
                label="Type de question"
                options={types}
                selected={question.type}
                setSelected={(value) => {
                  changeQuestionType(question.id, value);
                }}
              />

              {/* the propositions */}
              <div className="w-full my-2 pl-2">
                {question.propositions.map((proposition, propositionIndex) => {
                  return (
                    <div key={proposition.id}>
                      <Input
                        before={
                          question.type.value === 1 && (
                            <Checkbox
                              name={`question-${question.id}-proposition-${proposition.id}-valid`}
                              className="mr-2"
                              checked={proposition.valid}
                              register={register}
                              error={errors[`question-${question.id}`]}
                            />
                          )
                        }
                        className="flex-1"
                        label="Proposition"
                        name={`question-${question.id}-proposition-${proposition.id}`}
                        defaultValue={proposition.content}
                        error={
                          errors[
                            `question-${question.id}-proposition-${proposition.id}`
                          ]
                            ? "obligatoire"
                            : ""
                        }
                        register={register}
                        aside={
                          question.propositions.length !== 1 && (
                            <div
                              className="cursor-pointer h-11 w-11 rounded bg-rose-600 ml-2 border-red-500 ring-red-200 focus:border-red-300 outline-none flex items-center justify-center text-sm"
                              onClick={(e) => {
                                // in case i add any click event in the input component
                                e.preventDefault();
                                removeProposition(question.id, proposition.id);
                              }}
                            >
                              <MinusIcon className="w-6 h-6" />
                            </div>
                          )
                        }
                        required
                      />
                      {/* add a question || separator */}
                      {propositionIndex === question.propositions.length - 1 ? (
                        <div className="w-full flex flex-col md:flex-row justify-end">
                          {question.type.value !== 0 && (
                            <PrimaryButton
                              title={"Ajouter une proposition"}
                              onClick={(_) => {
                                addProposition(question.id);
                              }}
                            />
                          )}
                          {index === questions.length - 1 && (
                            <div className="mt-2 md:mt-0 md:ml-2">
                              <PrimaryButton
                                title={"Ajouter une question"}
                                onClick={(_) => {
                                  addQuestion();
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <hr />
                      )}
                      {/* add a question || separator */}
                    </div>
                  );
                })}
              </div>
              <hr />
            </div>
          );
        })}
      </div>

      <div className="buttons w-full flex justify-between">
        <TertiaryButton
          title="Précédent"
          onClick={(_) => {
            setStep(1);
          }}
        />
        <OutlinedButton title="Suivant" />
      </div>
    </form>
  );
};

const Recap = ({ setStep, data }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <img className="h-52" src={waiting} alt="waiting for your action !" />
      <div className="w-full flex items-center justify-between">
        <TertiaryButton
          title="Précédent"
          onClick={(_) => {
            setStep(2);
          }}
        />
        <div className="flex">
          <div className="mr-2">
            <OutlinedButton
              title="Sauvegarder"
              onClick={(_) => {
                console.log({ data });
              }}
            />
          </div>
          <PrimaryButton title="Publier" />
        </div>
      </div>
    </div>
  );
};

export const AddQuizModal = ({ open, setOpen }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const steps = {
    1: <InfosStep setStep={setStep} data={data} setData={setData} />,
    2: <QuestionsQuiz setStep={setStep} data={data} setData={setData} />,
    3: <Recap setStep={setStep} data={data} />,
  };
  return (
    <Modal
      isOpen={open}
      setIsOpen={(_) => {
        setOpen(!open);
      }}
      title="Créer un quiz"
      key="add-quiz-modal"
      onClose={(_) => {
        setStep(1);
        setData({});
      }}
    >
      <Steps
        steps={["Informations", "Questions", "Récapitulatif"]}
        current={step - 1}
      />
      {steps[step]}
    </Modal>
  );
};
