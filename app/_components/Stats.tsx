import { classNames } from "@/_utils/helpers";

export type Stat = {
  name: string; // Outstanding invoices
  value: string; // $245,988.00
  previousStat?: string;
  change?: string; //+10.18%
  changeType?: "positive" | "negative";
};

type Props = {
  stats: Stat[];
};

const statsBox = {
  first: "rounded-l-lg",
  middle: "",
  last: "rounded-r-lg",
};

const Stats = ({ stats }: Props) => {
  return (
    <dl className="rounded-lg ring-1 ring-slate-900/10 mx-auto grid grid-cols-1 gap-px bg-text-400/5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => {
        const getBoxPosition = (index: number) => {
          if (index === 0) return "first";
          if (index === stats.length - 1) return "last";
          return "middle";
        };

        return (
          <div
            key={stat.name}
            className={classNames(
              "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8",
              statsBox[getBoxPosition(index)]
            )}
          >
            <dt className="text-sm font-medium leading-6 text-gray-500">
              {stat.name}
            </dt>

            <dd
              className={classNames(
                stat.changeType === "negative"
                  ? "text-rose-600"
                  : "text-gray-700",
                "text-xs font-medium"
              )}
            >
              {stat.change}
            </dd>
            <dd className="w-full flex-none text-3xl font-bold leading-10 tracking-tight text-text-400">
              {stat.value}
              {!!stat.previousStat && (
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from {stat.previousStat}
                </span>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};

export default Stats;
