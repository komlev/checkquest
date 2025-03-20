import clsx from "clsx";
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";
import { Link } from "wouter";
import { Heading1, Subtitle } from "../../00-Atoms/Typography";

type Props = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "onClick"
> & {
  title: string;
  children: ReactNode;
  buttonId?: string;
  button: string;
  location?: string;
  onClick?: () => void;
};

export const Hero: FC<Props> = ({
  title,
  children,
  location,
  onClick,
  buttonId,
  button,
  ...props
}) => {
  const id = `hero-${buttonId}`;
  return (
    <div {...props} className={clsx("hero card shadow-md", props.className)}>
      <div className="hero-content py-10 text-center">
        <div className="max-w-md">
          <Heading1 className="text-5xl">{title}</Heading1>
          <Subtitle className="py-4">{children}</Subtitle>
          {button && (
            <>
              {location && (
                <Link id={id} to={location} className="btn btn-primary mt-2">
                  {button}
                </Link>
              )}
              {onClick && (
                <button
                  id={id}
                  onClick={onClick}
                  className="btn btn-primary mt-2"
                >
                  {button}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
