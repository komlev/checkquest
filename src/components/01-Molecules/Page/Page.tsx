import clsx from "clsx";
import type {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  ReactNode,
} from "preact/compat";
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
