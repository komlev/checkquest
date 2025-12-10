import clsx from "clsx";
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "preact/compat";
import { SearchIcon } from "../../00-Atoms/Icons/SearchIcon";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id: string;
  containerClassname?: string;
};

export const Search: FC<Props> = ({ containerClassname, id, ...props }) => (
  <label htmlFor={id} className={clsx("input", containerClassname)}>
    <SearchIcon
      width={14}
      className="fill-current opacity-50"
      aria-hidden="true"
      role="presentation"
    />
    <input
      id={id}
      aria-keyshortcuts="f"
      type="search"
      placeholder="Search"
      {...props}
      className={clsx("grow", props.className)}
    />
    <kbd className="kbd kbd-sm">F</kbd>
  </label>
);
