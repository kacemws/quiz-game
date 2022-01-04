import axios from "./default.instance";

export const addQuiz = async (data) => {
  try {
    return await axios.post("/quizzes", data);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const putQuiz = async (id, data) => {
  try {
    return await axios.put(`/quizzes/${id}`, data);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};
