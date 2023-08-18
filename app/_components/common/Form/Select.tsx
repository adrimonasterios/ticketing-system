import { classNames } from "@/_utils/helpers";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import HeroIcon from "../HeroIcon";

type Props = Partial<HTMLInputElement> & {
  label: string;
  onChange: (name: string, newValue: string) => void;
  items: string[];
  value: any;
  name: string;
};

const Select = ({ label, value, items, onChange, name, disabled }: Props) => {
  return (
    <Listbox value={value} onChange={(newValue) => onChange(name, newValue)}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button
              className={`${
                value ? "" : "h-9"
              } relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none sm:text-sm ${
                !disabled
                  ? "text-gray-700 focus:border-primary-500"
                  : "text-gray-500 bg-gray-100"
              }`}
            >
              <span className="block truncate">{value}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HeroIcon
                  className="h-5 w-5 text-gray-400"
                  icon="ChevronUpDownIcon"
                />
              </span>
            </Listbox.Button>
            {!disabled && (
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute list-none z-10 pl-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {items.map((item, index) => (
                    <Listbox.Option
                      key={`item-${index}`}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "text-text-400 bg-background-400"
                            : "text-gray-900",
                          "relative select-none py-2 pr-9 cursor-pointer list-none pl-4"
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {item}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-text-400" : "text-gray-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <HeroIcon className="h-5 w-5" icon="CheckIcon" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            )}
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
