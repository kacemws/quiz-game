import { atom } from "jotai";

function getValue() {
  const item = localStorage.getItem("types");
  if (item !== null) {
    return JSON.parse(item);
  }
  return [];
}

const types = atom(getValue());

export const typesAtom = atom(
  (get) => get(types),
  (_, set, value) => {
    set(types, value);
    localStorage.setItem("types", JSON.stringify(value));
  }
);
