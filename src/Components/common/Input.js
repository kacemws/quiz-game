import React from "react";
import { Body, Caption } from "./";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

/**
 * InputText
 * @description
 * @param {object} props InputText props.
 * @param {string} props.label text of the input label.
 * @param {string} props.type type of the input (text - password ...).
 * @param {string} props.error input error text
 * @param {string} props.name name of the input
 * @param {boolean} props.required field required
 * @param {JSX} props.register useForm register
 * @param {string} props.underText text under input field
 * @returns JSX.Element
 * @author
 */
export const Input = ({
  type = "text",
  label = "",
  underText = "",
  error = "",
  name = "",
  register = () => {},
  required = false,
  pattern,
  minLength,
  maxLength,
  className = "",
  validate,
  defaultValue = "",
  password = false,
}) => {
  const [finalType, setType] = React.useState(type);
  return (
    <div className={`flex flex-col my-2 ${className}`}>
      <Body color={error === "" ? "text-blackText-300" : "text-red-500"}>
        {label}
        {error === "" ? (
          ""
        ) : (
          <span style={{ textTransform: "initial" }} className="italic">
            {" - " + error}
          </span>
        )}
      </Body>
      <div className="relative flex items-center">
        <input
          name={name}
          type={finalType}
          defaultValue={defaultValue}
          {...register(name, {
            required,
            pattern: pattern ?? {},
            minLength: minLength ?? null,
            maxLength: maxLength ?? null,
            validate: validate,
          })}
          className={`outline-none w-full text-sm text-blackText-300 p-2 my-2 rounded-md shadow-sm border focus:outline-none focus:ring-2 h-11 ${
            false && "border-red-300"
          } ${
            error === ""
              ? "focus:border-primary-300 border-gray-300 ring-primary-200"
              : "border-red-500 ring-red-200 focus:border-red-300"
          } `}
        />
        {password && (
          <div className="absolute right-0 mx-2 select-none outline-none p-2 h-11 flex items-center justify-center">
            {finalType === "password" ? (
              <EyeIcon
                className="h-6 w-6 cursor-pointer text-primary-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setType("text");
                }}
              />
            ) : (
              <EyeOffIcon
                className="h-6 w-6 cursor-pointer text-primary-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setType("password");
                }}
              />
            )}
          </div>
        )}
      </div>
      <Caption color="text-gray-400">{underText}</Caption>
    </div>
  );
};
