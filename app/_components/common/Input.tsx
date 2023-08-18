import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import React, {
  FocusEvent,
  InputHTMLAttributes,
  MutableRefObject,
  forwardRef,
} from "react";
import { classNames } from "@/_utils/helpers";
import HeroIcon from "./HeroIcon";

type Props = Partial<InputHTMLAttributes<HTMLInputElement>> & {
  label?: string;
  value: string;
  errorMessage?: string;
  placeholder?: string;
  trailingAddOn?: JSX.Element;
  leadingAddOn?: JSX.Element;
  readonlyef?: MutableRefObject<HTMLInputElement | null>;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

const Input = ({
  name,
  label,
  type,
  placeholder,
  onChange,
  value,
  errorMessage,
  trailingAddOn,
  leadingAddOn,
  onBlur,
  onKeyDown,
  ...props
}: Props) => {
  return (
    <div className="mb-4">
      {!!label && (
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative mt-1 rounded-md shadow-sm">
        {!!leadingAddOn && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{leadingAddOn}</span>
          </div>
        )}
        <input
          {...props}
          type={type || "text"}
          name={name}
          className={classNames(
            `block w-full rounded-md focus:outline-none sm:text-sm`,
            errorMessage
              ? "pr-10 border-red-300   placeholder-red-300 focus:border-red-500  focus:ring-red-500"
              : " border-gray-300 focus:border-primary-400  focus:ring-primary-400",
            leadingAddOn ? "pl-10" : ""
          )}
          placeholder={placeholder}
          value={value || ""}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
        {!!errorMessage && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <HeroIcon
              className="h-5 w-5 text-red-500"
              icon="ExclamationCircleIcon"
            />
          </div>
        )}
      </div>
      {!!errorMessage && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
