import clsx from "clsx";
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

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
    className={clsx("text-base-content text-4xl font-bold", props.className)}
  >
    {children}
  </h1>
);

export const Heading2: FC<HeadingProps> = ({ children, ...props }) => (
  <h2
    {...props}
    className={clsx("text-base-content text-3xl font-bold", props.className)}
  >
    {children}
  </h2>
);

export const Heading3: FC<HeadingProps> = ({ children, ...props }) => (
  <h3
    {...props}
    className={clsx("text-base-content text-2xl font-bold", props.className)}
  >
    {children}
  </h3>
);

export const Heading4: FC<HeadingProps> = ({ children, ...props }) => (
  <h4
    {...props}
    className={clsx("text-base-content text-xl font-bold", props.className)}
  >
    {children}
  </h4>
);

export const Subtitle: FC<HeadingProps> = ({ children, className = "" }) => (
  <div className={clsx("text-base-content/80 text-lg font-medium", className)}>
    {children}
  </div>
);

export const Body: FC<TextProps> = ({ children, className = "" }) => (
  <p className={clsx("text-base-content text-base", className)}>{children}</p>
);

export const Caption: FC<TextProps> = ({ children, className = "" }) => (
  <p className={clsx("text-base-content/70 text-sm", className)}>{children}</p>
);
