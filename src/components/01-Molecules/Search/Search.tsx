import clsx from "clsx";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { SearchIcon } from "../../00-Atoms/Icons/SearchIcon";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  containerClassname?: string;
};

export const Search: FC<Props> = ({ containerClassname, ...props }) => (
  <label className={clsx("input", containerClassname)}>
    <SearchIcon
      width={14}
      className="fill-current opacity-50"
      aria-hidden="true"
      role="presentation"
    />
    <input
      aria-keyshortcuts="f"
      type="search"
      placeholder="Search"
      {...props}
      className={clsx("grow", props.className)}
    />
    <kbd className="kbd kbd-sm" role="presentation" aria-hidden="true">
      F
    </kbd>
  </label>
);
