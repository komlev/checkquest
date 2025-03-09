import clsx from "clsx";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

export const Line: FC<Props> = ({ children, className }) => (
  <div className={clsx("divider", className)}>{children}</div>
);
