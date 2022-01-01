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
                  className={`h-14 w-14 mr-2 flex items-center justify-center rounded-full border border-primary-300 font-bold ${
                    index <= current
                      ? "bg-primary-300 text-whiteText-300"
                      : "text-primary-300"
                  }`}
                >
                  {index < current ? (
                    <CheckIcon className="w-8 h-8" />
                  ) : (
                    index + 1
                  )}
                </div>
                <Heading>{label}</Heading>
              </div>
              {index !== steps.length - 1 && (
                <div className="flex-1 h-px ml-2 bg-primary-300" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
