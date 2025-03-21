import { GithubIcon } from "../../00-Atoms/Icons/GithubIcon";
import { ThemeSwitcher } from "../../00-Atoms/ThemeSwitcher/ThemeSwitcher";

export const Footer = () => (
  <div className="relative">
    <footer
      className="relative footer footer-center py-4 bg-neutral z-10"
      role="contentinfo"
    >
      <div className="flex font-medium text-neutral-content">
        CheckQuest by{" "}
        <a
          className="link focusable focusable-neutral"
          target="_blank"
          href="https://komlev.me"
          rel="noopener noreferrer"
          aria-label="Visit komlev's website"
        >
          komlev
        </a>
        <a
          target="_blank"
          className="link focusable focusable-neutral"
          href="https://github.com/komlev/checkquest"
          title="Github link"
          aria-label="Github link"
        >
          <GithubIcon />
        </a>
      </div>
      <div className="absolute right-4">
        <ThemeSwitcher />
      </div>
    </footer>
  </div>
);
