import clsx from "clsx";
import {
  DetailedHTMLProps,
  FC,
  FieldsetHTMLAttributes,
  ReactNode,
} from "react";

type Props = DetailedHTMLProps<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  HTMLFieldSetElement
> & {
  required?: boolean;
  label: ReactNode;
  labelClassname?: string;
  error?: string;
};

export const FormControl: FC<Props> = ({
  id,
  label,
  error,
  required,
  labelClassname,
  ...props
}) => (
  <fieldset
    {...props}
    className={clsx("fieldset", props.className)}
    aria-required={required}
    aria-invalid={!!error}
  >
    <legend className={clsx("fieldset-legend text-start", labelClassname)}>
      {label}
    </legend>
    {props.children}
    <label
      htmlFor={id}
      className={clsx(
        "label text-error transition-opacity",
        !error && "opacity-0"
      )}
      aria-live="polite"
      role={error ? "alert" : undefined}
    >
      {error || "-"}
    </label>
  </fieldset>
);
