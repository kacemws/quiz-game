import { atom } from "jotai";
// count and items

function getValue() {
  const item = localStorage.getItem("quizzes");
  if (item !== null) {
    return JSON.parse(item);
  }
  return {
    items: [],
    count: 0,
  };
}

const quizzes = atom(getValue());

export const quizzesAtom = atom(
  (get) => get(quizzes),
  (_, set, value) => {
    set(quizzes, value);
    localStorage.setItem("quizzes", JSON.stringify(value));
  }
);
