import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { quizzesAtom } from "../../data";

import { deleteQuiz } from "../../services";

import { Modal, Input, DangerButton, Loader } from "..";

const ConfirmDelete = ({ data, close }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  }); //form validation

  const [loading, setLoading] = useState(false);
  const [, setQuizzes] = useAtom(quizzesAtom);

  return (
    <form
      onSubmit={handleSubmit(async (formData) => {
        try {
          setLoading(true);
          // verify password, if it matches then proceeed
          await deleteQuiz(data?.id, formData?.password, setQuizzes);
          close(false);
        } catch (error) {
          setLoading(false);
          setError("password", {
            message: error?.message,
            type: "manual",
          });
        }
      })}
    >
      <Input
        label="Veuillez saisir le mot de passe du quiz"
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
            : errors?.password?.type === "manual"
            ? "Mot de passe invalide"
            : ""
        }
        register={register}
        minLength={6}
        pattern={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&-+]{6,}$/}
        required
      />
      <div className="w-full flex justify-end">
        <DangerButton
          title="Supprimer"
          type="primary"
          disabled={loading}
          loading={loading}
        />
      </div>
    </form>
  );
};

export const DeleteQuizModal = ({ quiz, open, setOpen }) => {
  const steps = {
    1: <ConfirmDelete data={quiz} close={setOpen} />,
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Modal
      isOpen={open}
      setIsOpen={(_) => {
        setOpen(!open);
      }}
      title="Êtes vous sur de vouloir supprimer le quiz?"
      key="delete-quiz-modal"
      onClose={(_) => {}}
    >
      {loading ? <Loader /> : <>{steps[1]}</>}
    </Modal>
  );
};
