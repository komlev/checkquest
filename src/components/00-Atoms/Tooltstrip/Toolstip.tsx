import clsx from "clsx";
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Toolstrip: FC<Props> = (props) => (
  <div
    {...props}
    className={clsx(
      "flex flex-col items-start justify-between gap-2 md:flex-row md:items-start",
      props.className,
    )}
  >
    {props.children}
  </div>
);
