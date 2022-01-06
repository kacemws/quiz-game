import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Modal, Input, Loader, OutlinedButton } from "..";

const ConfirmDelete = ({ close }) => {
  const { register, handleSubmit, setError } = useForm({
    mode: "onChange",
  }); //form validation

  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(async (formData) => {
        try {
          setLoading(true);
          close(false);
        } catch (error) {
          setLoading(false);
          setError("name", {
            message: error?.message,
            type: "manual",
          });
        }
      })}
    >
      <Input
        label="Veuillez saisir votre nom d'utilisateur"
        password
        name="name"
        register={register}
        required
      />
      <div className="w-full flex justify-end">
        <OutlinedButton
          title="Confirmer"
          type="primary"
          disabled={loading}
          loading={loading}
        />
      </div>
    </form>
  );
};

export const UsernameModal = ({ open, setOpen }) => {
  const steps = {
    1: <ConfirmDelete close={setOpen} />,
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
      title=""
      key="username-quiz-modal"
      onClose={(_) => {}}
    >
      {loading ? <Loader /> : <>{steps[1]}</>}
    </Modal>
  );
};
