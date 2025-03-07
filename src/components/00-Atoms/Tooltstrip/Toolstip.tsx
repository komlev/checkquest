import clsx from "clsx";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Toolstrip: FC<Props> = (props) => (
  <div
    {...props}
    className={clsx(
      "flex flex-col md:flex-row justify-between items-start md:items-start gap-2",
      props.className
    )}
  >
    {props.children}
  </div>
);
