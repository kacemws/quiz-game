import React from "react";
import { Body, Checkbox, Input, PageTitle } from "..";

export const Step = ({ question }) => {
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
                    name={`question-${question.id}-proposition-${answer.id}`}
                    // error={
                    //   errors[
                    //     `question-${question.id}-proposition-${proposition.id}`
                    //   ]
                    //     ? "obligatoire"
                    //     : ""
                    // }
                    // register={register}
                  />
                ) : (
                  <div className="flex items-center my-4 hover:my-2 bg-gray-50 rounded-md p-2 hover:py-4 border border-gray-300 shadow-sm hover:shadow-xl hover:cursor-pointer transition duration-200 ease-in-out">
                    <Checkbox
                      name={`question-${question.id}-proposition-${answer.id}-valid`}
                      className="mr-4 cursor-pointer"
                      // register={register}
                      // error={errors[`question-${question.id}`]}
                    />
                    <div className="flex-1">
                      <Body>{answer?.content}</Body>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};
