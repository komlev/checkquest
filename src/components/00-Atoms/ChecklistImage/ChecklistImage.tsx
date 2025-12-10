import type { FC } from "preact/compat";

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const ChecklistImage: FC<Props> = (props) => (
  <img {...props} src="/landing.svg" alt="Checklist" />
);
