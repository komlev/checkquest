import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { getSkillLevel } from "../../../utils/checklist";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  score: number;
  maxPoints: number;
};

export const SkillLevel: FC<Props> = ({ score, maxPoints, ...props }) => {
  const level = getSkillLevel(score, maxPoints);
  return <span {...props}>{level}</span>;
};
