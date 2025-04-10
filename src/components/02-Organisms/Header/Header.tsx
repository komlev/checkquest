import { Link } from "wouter";
import { CHECKLIST_LIST, INTERVIEW_LIST, ROOT } from "../../../routes";
import { Container } from "../../00-Atoms/Container/Container";
import { CheckIcon } from "../../00-Atoms/Icons/CheckIcon";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";

export const Header = () => (
  <header
    className="navbar bg-neutral py-2 items-center flex-col flex justify-center"
    role="banner"
  >
    <Container className="flex justify-between items-center text-neutral-content">
      <div className="flex gap-3 items-center">
        <Link
          to={ROOT}
          className="font-black text-2xl flex gap-2 items-center w-fit rounded-sm focusable-neutral"
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
        <Breadcrumbs className="mt-1" />
      </div>
      <nav aria-label="Main Navigation">
        <ul className="flex gap-2">
          <li>
            <Link
              id="interviews-link"
              to={INTERVIEW_LIST}
              className="btn btn-sm btn-accent btn-outline"
            >
              Interviews
            </Link>
          </li>
          <li>
            <Link
              id="checklists-link"
              to={CHECKLIST_LIST}
              className="btn btn-sm btn-warning btn-outline"
            >
              Checklists
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  </header>
);
