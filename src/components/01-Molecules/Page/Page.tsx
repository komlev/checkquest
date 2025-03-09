import clsx from "clsx";
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";
import { Container } from "../../00-Atoms/Container/Container";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children: ReactNode;
};

export const Page: FC<Props> = ({ children, ...props }) => (
  <Container {...props} className={clsx("py-6", props.className)}>
    {children}
  </Container>
);
