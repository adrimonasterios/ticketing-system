import { TextareaHTMLAttributes } from "react";
import HeroIcon from "./HeroIcon";
import { classNames } from "@/_utils/helpers";

type Props = Partial<TextareaHTMLAttributes<HTMLTextAreaElement>> & {
  label?: string;
  value: string;
  errorMessage?: string;
};

const TextArea = ({ label, value, rows, errorMessage, ...props }: Props) => {
  return (
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium leading-6 text-text-400"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          rows={rows}
          className={classNames(
            `block w-full rounded-md focus:outline-none sm:text-sm`,
            errorMessage
              ? "pr-10 border-red-300   placeholder-red-300 focus:border-red-500  focus:ring-red-500"
              : " border-gray-300 focus:border-primary-400  focus:ring-primary-400"
          )}
          value={value}
          {...props}
        />
      </div>
      {!!errorMessage && (
        <div className="flex items-center mt-2 ">
          <div className="pointer-events-none inset-y-0 flex items-center pr-3">
            <HeroIcon
              className="h-5 w-5 text-red-500"
              icon="ExclamationCircleIcon"
            />
          </div>
          <p className="text-sm text-red-600" id="email-error">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default TextArea;
