import { Link } from "wouter";
import { CHECKLIST_LIST, INTERVIEW_LIST, ROOT } from "../../../routes";
import { Container } from "../../00-Atoms/Container/Container";
import { CheckIcon } from "../../00-Atoms/Icons/CheckIcon";
import { ThemeSwitcher } from "../../00-Atoms/ThemeSwitcher/ThemeSwitcher";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";

export const Header = () => (
  <header
    className="navbar bg-base-200 py-2 items-center flex-col flex gap-1"
    role="banner"
  >
    <Container className="flex justify-between items-center">
      <Link
        to={ROOT}
        className="font-black text-2xl flex gap-2 items-center w-fit rounded-sm"
        aria-label="CheckQuest Home"
      >
        <CheckIcon
          className="text-warning fill-current"
          width={20}
          aria-hidden="true"
          role="presentation"
        />
        <span className="hidden md:block text-warning">
          <span className="text-accent">Check</span>Quest
        </span>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className="flex gap-2">
          <li>
            <Link
              to={INTERVIEW_LIST}
              className="btn btn-sm btn-accent btn-dash"
            >
              Interviews
            </Link>
          </li>
          <li>
            <Link
              to={CHECKLIST_LIST}
              className="btn btn-sm btn-warning btn-dash"
            >
              Checklists
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
    <Container className="flex justify-between items-center">
      <Breadcrumbs />
      <ThemeSwitcher />
    </Container>
  </header>
);
