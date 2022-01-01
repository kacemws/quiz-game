import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Input, Steps, OutlinedButton, TertiaryButton } from "../";

const InfosStep = ({ setStep, data, setData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" }); //form validation

  return (
    <form
      onSubmit={handleSubmit((data) => {
        try {
          setData({ ...data });
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
  return (
    <>
      <Input label="Nom du quiz" />
      <Input
        label="Mot de passe"
        underText="Protéger votre quiz avec un mot de passe"
        password
      />
      <div className="w-full flex justify-between">
        <TertiaryButton
          title="Précédent"
          onClick={(_) => {
            setStep(1);
          }}
        />
        <OutlinedButton
          title="Confirmer"
          onClick={(_) => {
            // setStep(2);
          }}
        />
      </div>
    </>
  );
};

export const AddQuizModal = ({ open, setOpen }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const steps = {
    1: <InfosStep setStep={setStep} data={data} setData={setData} />,
    2: <QuestionsQuiz setStep={setStep} data={data} setData={setData} />,
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
      <Steps steps={["Informations", "Questions"]} current={step - 1} />
      {steps[step]}
    </Modal>
  );
};
