import axios from "./default.instance";

export const getStatuses = () => {
  return axios.get("/quizzes/quiz-states");
};
