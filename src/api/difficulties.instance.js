import axios from "./default.instance";

export const getDifficulties = () => {
  return axios.get("/quizzes/difficulties");
};
