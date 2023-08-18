import { classNames } from "@/_utils/helpers";

const colors = {
  green: "text-primary-400 bg-background-400 ring-primary-400/10",
  gray: "text-gray-600 bg-gray-50 ring-gray-500/10",
  red: "text-red-700 bg-red-50 ring-red-600/10",
  orange: "text-orange-700 bg-secondary-400 ring-orange-600/10",
};

type Props = {
  text: string;
  color: "gray" | "green" | "red" | "orange";
};

const Tag = ({ text, color }: Props) => {
  return (
    <div
      className={classNames(
        colors[color],
        "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset flex justify-center"
      )}
    >
      {text}
    </div>
  );
};

export default Tag;
