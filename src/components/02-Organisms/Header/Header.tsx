import { Link } from "wouter";
import {
  CHECKLIST_LIST,
  INTERVIEW_LIST,
  ROOT,
  TEMPLATES_LIST,
} from "../../../routes";
import { Container } from "../../00-Atoms/Container/Container";
import { CheckIcon } from "../../00-Atoms/Icons/CheckIcon";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";

export const Header = () => (
  <header
    className="navbar bg-neutral flex flex-col items-center justify-center py-2"
    role="banner"
  >
    <Container className="text-neutral-content flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link
          to={ROOT}
          className="focusable-neutral flex w-fit items-center gap-2 rounded-sm text-2xl font-black"
          aria-label="CheckQuest Home"
        >
          <CheckIcon
            className="text-warning fill-current"
            width={20}
            aria-hidden="true"
            role="presentation"
          />
          <span className="text-warning hidden md:block">
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
          <li>
            <Link
              id="templates-link"
              to={TEMPLATES_LIST}
              className="btn btn-sm btn-outline"
            >
              Templates
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  </header>
);
