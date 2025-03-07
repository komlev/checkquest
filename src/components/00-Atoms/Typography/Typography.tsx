import clsx from "clsx";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type TextProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const Heading1: FC<HeadingProps> = ({ children, ...props }) => (
  <h1
    {...props}
    className={clsx("text-4xl font-bold text-base-content", props.className)}
  >
    {children}
  </h1>
);

export const Heading2: FC<HeadingProps> = ({ children, ...props }) => (
  <h2
    {...props}
    className={clsx("text-3xl font-bold text-base-content", props.className)}
  >
    {children}
  </h2>
);

export const Heading3: FC<HeadingProps> = ({ children, ...props }) => (
  <h3
    {...props}
    className={clsx("text-2xl font-bold text-base-content", props.className)}
  >
    {children}
  </h3>
);

export const Heading4: FC<HeadingProps> = ({ children, ...props }) => (
  <h4
    {...props}
    className={clsx("text-xl font-bold text-base-content", props.className)}
  >
    {children}
  </h4>
);

export const Subtitle: FC<HeadingProps> = ({ children, className = "" }) => (
  <p className={clsx("text-lg font-medium text-base-content/80", className)}>
    {children}
  </p>
);

export const Body: FC<TextProps> = ({ children, className = "" }) => (
  <p className={clsx("text-base text-base-content", className)}>{children}</p>
);

export const Caption: FC<TextProps> = ({ children, className = "" }) => (
  <p className={clsx("text-sm text-base-content/70", className)}>{children}</p>
);
