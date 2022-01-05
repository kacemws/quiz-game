import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const solutions = [
  {
    name: "Insights",
    description: "Measure actions your users take",
    href: "##",
  },
  {
    name: "Automations",
    description: "Create your own targeted content",
    href: "##",
  },
  {
    name: "Reports",
    description: "Keep track of your growth",
    href: "##",
  },
];

export const PopoverComponent = ({ button, setItem, options = solutions }) => {
  return (
    <div>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button>{button}</Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-2 z-10 min-w-[16rem] px-4 mt-3 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative bg-white py-4">
                    {options.map((item) => (
                      <div
                        key={item.value}
                        className="h-12 px-4 border-b last:border-0 border-gray-400 flex items-center transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-opacity-50 hover:cursor-pointer"
                        onClick={(e) => {
                          setItem(item.value);
                        }}
                      >
                        <Popover.Button className="text-sm font-medium text-blackText-300">
                          {item.label}
                        </Popover.Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
