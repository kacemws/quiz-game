import { CheckIcon } from "@heroicons/react/outline";
import { Heading } from ".";

export const Steps = ({ steps = [], current }) => {
  return (
    <div className="flex my-6 w-full items-center justify-between">
      {steps.map((label, index) => {
        return (
          <div
            className={`${index !== steps.length - 1 ? "flex-1" : ""}`}
            key={`step-${index}`}
          >
            <div
              className={`flex items-center ${
                index !== steps.length - 1 ? "w-full" : ""
              }`}
            >
              <div className="wrapper flex items-center">
                <div
                  className={`h-8 w-8 md:h-14 md:w-14 md:mr-2 flex items-center justify-center rounded-full border border-primary-300 font-bold ${
                    index <= current
                      ? "bg-primary-300 text-whiteText-300"
                      : "text-primary-300"
                  }`}
                >
                  {index < current ? (
                    <CheckIcon className="h-6 w-6 md:w-8 md:h-8" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="hidden md:block">
                  <Heading>{label}</Heading>
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div className="flex-1 h-px md:ml-2 bg-primary-300" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
