import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  score: number;
  maxPoints: number;
};

export const SkillLevel: FC<Props> = ({
  score: value,
  maxPoints: maxValue,
  ...props
}) => {
  const level =
    value === 0
      ? "None"
      : value < maxValue * 0.2
      ? "Trainee"
      : value < maxValue * 0.4
      ? "Junior"
      : value < maxValue * 0.7
      ? "Middle"
      : value < maxValue * 0.9
      ? "Senior"
      : "Expert";

  return <span {...props}>{level}</span>;
};
