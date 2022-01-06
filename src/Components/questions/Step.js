import React from "react";
import { Body, Checkbox, Input, PageTitle } from "..";

export const Step = ({ register, errors = {}, question, disabled }) => {
  console.log({ question });
  return (
    <>
      <PageTitle>{question?.content}</PageTitle>
      <div className="w-full h-full flex items-center">
        <div className="w-full px-2">
          {question?.answers?.map((answer, index) => {
            return (
              <React.Fragment key={answer.id}>
                {question?.type?.value === 0 ? (
                  <Input
                    label="Saisir votre réponse"
                    className="flex-1"
                    name={`${answer.id}`}
                    error={
                      errors[`${answer.id}`]
                        ? errors[`${answer.id}`].message || "obligatoire"
                        : ""
                    }
                    disabled={disabled}
                    required
                    register={register}
                  />
                ) : (
                  <>
                    <Body
                      color={
                        errors["checkbox"] ||
                        errors[answer?.id]?.message?.includes("mauvais")
                          ? "text-red-500"
                          : errors[answer?.id]?.message?.includes("bon")
                          ? "text-primary-500"
                          : ""
                      }
                      align="left"
                    >
                      <span
                        style={{ textTransform: "initial" }}
                        className="italic text-base"
                      >
                        {errors["checkbox"]?.message ||
                          errors[answer?.id]?.message}
                      </span>
                    </Body>
                    <div
                      className={`flex items-center my-4 hover:my-2 bg-gray-50 rounded-md p-2 hover:py-4 border border-gray-300 shadow-sm hover:shadow-xl hover:cursor-pointer transition duration-200 ease-in-out ${
                        errors["checkbox"] ||
                        errors[answer?.id]?.message?.includes("mauvais")
                          ? "border-red-300"
                          : errors[answer?.id]?.message?.includes("bon")
                          ? "border-green-300"
                          : ""
                      }`}
                    >
                      <Checkbox
                        name={`${answer.id}`}
                        className={`mr-4 cursor-pointer ${
                          errors[answer.id]?.message?.includes("bon") &&
                          "border-primary-300"
                        }`}
                        register={register}
                        error={errors[`${answer.id}`]}
                        disabled={disabled}
                      />
                      <div className="flex-1">
                        <Body>{answer?.content}</Body>
                      </div>
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};
