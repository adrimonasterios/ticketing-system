"use client";
import { ITicket } from "@/(routes)/api/_models/ticket";
import { classNames } from "@/_utils/helpers";
import { useEffect, useState } from "react";

export type Stat = {
  name: string;
  value: number;
};

type Props = {
  tickets: ITicket[];
};

const statsBox = {
  first: "rounded-l-lg",
  middle: "",
  last: "rounded-r-lg",
};

const Stats = ({ tickets }: Props) => {
  const [stats, setStats] = useState<Stat[]>([
    { name: "Your Tickets", value: 0 },
    { name: "Open Tickets", value: 0 },
    { name: "Resolved Tickets", value: 0 },
  ]);

  useEffect(() => {
    (async () => {
      const newStats = tickets.reduce((acc: Stat[], t: ITicket) => {
        acc[0].value++;
        if (t.status === "resolved") {
          acc[2].value++;
        } else {
          acc[1].value++;
        }
        return acc;
      }, stats.slice());
      setStats(newStats);
    })();
  }, [tickets.length]);

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
            <dd className="w-full flex-none text-3xl font-bold leading-10 tracking-tight text-text-400">
              {stat.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};

export default Stats;
