import { atom } from "jotai";
function getValue() {
  const item = localStorage.getItem("states");
  if (item !== null) {
    return JSON.parse(item);
  }
  return [];
}

const stateAtom = atom(getValue());

export const statesAtom = atom(
  (get) => get(stateAtom),
  (_get, set, value) => {
    console.log("****");
    set(stateAtom, value);
    localStorage.setItem("states", JSON.stringify(value));
  }
);
