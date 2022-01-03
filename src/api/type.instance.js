import axios from "./default.instance";

export const getTypes = () => {
  return axios.get("/quizzes/question-types");
};
