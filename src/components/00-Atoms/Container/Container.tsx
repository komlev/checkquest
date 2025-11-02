import clsx from "clsx";
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Container: FC<Props> = (props) => (
  <div
    {...props}
    className={clsx("container mx-auto lg:max-w-screen-lg", props.className)}
  >
    {props.children}
  </div>
);
