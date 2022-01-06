import { addQuiz, putQuiz, getFilteredQuizzes, getQuizById } from "../api";
export function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const createQuiz = async (data, setQuizzes) => {
  try {
    // already created
    if (data?.id) return data?.id;
    const { data: resp } = await addQuiz({
      name: data?.name,
      password: data?.password,
      rating: 0,
      numberOfVotes: 0,
      numberOfPlays: 0,
    });
    const quizzes = await getPaginatedPublishedQuizzes(1, 10);
    setQuizzes(quizzes);
    return resp?.id;
  } catch (error) {
    if (error?.message === "quiz with the same name already exists") {
      throw new Error("Ce nom est déjà utilisé");
    }
    throw new Error(error?.message);
  }
};

export const updateQuiz = async (data, setQuizzes) => {
  try {
    // already created
    if (!data?.id) {
      throw new Error("Ce quiz n'existe pas");
    }
    console.log({ data });
    const body = {
      id: data?.id,
      name: data?.name,
      password: data?.password,
      state: data?.state?.value,
      difficulty: data?.difficulty?.value,
      rating: data?.rating ?? 0,
      numberOfVotes: data?.numberOfVotes ?? 0,
      numberOfPlays: data?.numberOfPlays ?? 0,
      quizQuestions: {
        ...data?.quizQuestions,
        quizId: data?.id,
        questions: [
          ...data?.questions.map((question) => {
            return {
              id: question?.id?.length > 6 ? question?.id : undefined,
              quizQuestionsId: question?.quizQuestionsId,
              content: question?.question,
              type: question?.type?.value,
              answers: question.propositions.map(
                ({ id, questionId, content, valid }) => {
                  return {
                    id: id?.length > 4 ? id : undefined,
                    questionId,
                    content,
                    valid,
                  };
                }
              ),
            };
          }),
        ],
      },
    };
    const { data: resp } = await putQuiz(data?.id, body);
    console.log({ resp });
    const quizzes = await getPaginatedPublishedQuizzes(1, 10);
    setQuizzes(quizzes);
    return resp?.id;
  } catch (error) {
    if (error?.message === "quiz with the same name already exists") {
      throw new Error("Ce nom est déjà utilisé");
    }
    throw new Error(error?.message);
  }
};

export const addQuestion = (setQuestions) => {
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

export const changeQuestionType = (
  questions,
  setQuestions,
  unregister,
  id,
  value
) => {
  const index = questions.findIndex((question) => question.id === id);
  const aux = [...questions];
  aux[index].type = value;
  aux[index].propositions.forEach((proposition) => {
    unregister(`question-${id}-proposition-${proposition.id}`);
  });
  aux[index].propositions = [{ ...aux[index].propositions[0], valid: true }];
  setQuestions(aux);
};

export const removeQuestion = (questions, setQuestions, unregister, id) => {
  const index = questions.findIndex((question) => question.id === id);
  const aux = [...questions];
  aux[index].propositions.forEach((proposition) => {
    unregister(`question-${id}-proposition-${proposition.id}`);
  });
  unregister(`question-${id}`);

  aux.splice(index, 1);
  setQuestions(aux);
};

export const addProposition = (questions, setQuestions, questionId) => {
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

export const removeProposition = (
  questions,
  setQuestions,
  unregister,
  questionId,
  propositionId
) => {
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

export const getPaginatedPublishedQuizzes = async (page = 1, size = 10) => {
  try {
    const { data: resp } = await getFilteredQuizzes(1, page, size);
    return (
      resp || {
        items: [],
        count: 0,
      }
    );
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const getAllQuizzes = async (filter, page = 1, size = 10) => {
  try {
    const { data: resp } = await getFilteredQuizzes(filter, page, size);
    return (
      resp || {
        items: [],
        count: 0,
      }
    );
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const getSerialisedQuizById = async (
  difficulties,
  types,
  id,
  password = ""
) => {
  try {
    const { data: quiz } = await getQuizById(id, password);
    console.log({ quiz });
    return {
      id: quiz?.id,
      name: quiz?.name,
      password: quiz?.password,
      difficulty: {
        label: difficulties.find(
          (difficulty) => difficulty?.value === quiz?.difficulty
        )?.label,
        value: quiz?.difficulty,
      },
      rating: quiz?.rating ?? 0,
      numberOfVotes: quiz?.numberOfVotes ?? 0,
      numberOfPlays: quiz?.numberOfPlays ?? 0,
      quizQuestions: {
        id: quiz?.quizQuestions?.id,
        quizId: quiz?.id,
        questions: [
          ...quiz?.quizQuestions?.questions.map((question) => {
            return {
              ...question,
              question: question?.content,
              propositions: question.answers,
              type: {
                label: types.find((type) => type?.value === question?.type)
                  ?.label,
                value: question?.type,
              },
            };
          }),
        ],
      },
    };
  } catch (error) {
    if (error?.message === "401") {
      throw new Error("Les mots de passe ne correspondent pas");
    }
    throw error;
  }
};
