"use client";
import { classNames } from "@/_utils/helpers";
import { PropsWithChildren } from "react";

const Container = ({
  className,
  children,
}: PropsWithChildren & { className?: string }) => {
  return (
    <div
      className={classNames(
        "py-8 px-12 rounded-lg ring-1 ring-slate-900/10",
        className || ""
      )}
    >
      {children}
    </div>
  );
};

export default Container;
