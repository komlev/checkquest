import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  value: number;
  maxValue: number;
  asPercentage?: boolean;
};

const padScore = (num: number, len: number) =>
  num.toString().padStart(len, "0");

export const Score: FC<Props> = ({
  value,
  maxValue,
  asPercentage,
  ...props
}) => {
  let score = "0";
  if (asPercentage) {
    score = `${Math.round(maxValue > 0 ? (value / maxValue) * 100 : 0)}%`;
  } else {
    score = padScore(
      value,
      maxValue.toString().length - value.toString().length + 1,
    );
  }

  return <span {...props}>{score}</span>;
};
