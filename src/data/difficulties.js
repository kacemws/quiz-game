import { atom } from "jotai";

function getValue() {
  const item = localStorage.getItem("difficulties");
  if (item !== null) {
    return JSON.parse(item);
  }
  return [];
}

const difficulties = atom(getValue());

export const difficultiesAtom = atom(
  (get) => get(difficulties),
  (_, set, value) => {
    set(difficulties, value);
    localStorage.setItem("difficulties", JSON.stringify(value));
  }
);
