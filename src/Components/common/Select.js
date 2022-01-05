import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import { Body } from "../";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Select = ({
  options = [],
  label,
  error = "",
  onOptionSelected = () => {},
  selected,
  setSelected,
}) => {
  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        setSelected(value);
        if (selected?.value !== value?.value) onOptionSelected(value?.value);
      }}
    >
      {({ open }) => (
        <>
          <Body
            align="left"
            color={error === "" ? "text-blackText-300" : "text-red-500"}
          >
            {label}
            {error === "" ? (
              ""
            ) : (
              <span style={{ textTransform: "initial" }} className="italic">
                {" - " + error}
              </span>
            )}
          </Body>
          <div className="my-2 relative">
            <Listbox.Button className="relative w-full outline-none text-sm text-blackText-300 p-2 my-2 rounded-md shadow-sm border focus:outline-none focus:ring-2 h-11 focus:border-primary-300 border-gray-300 ring-primary-200">
              <span className="flex items-center">
                <span className="ml-3 block truncate capitalize text-sm text-blackText-300">
                  {selected?.label}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-24 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-gray-900 bg-primary-100"
                          : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate capitalize text-sm"
                            )}
                          >
                            {option?.label}
                          </span>
                        </div>

                        {selected ? (
                          <span className="text-kio-600 absolute inset-y-0 right-0 flex items-center pr-4">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
