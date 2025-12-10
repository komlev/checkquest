import { type FC, useEffect, useState } from "preact/compat";
import { Link } from "wouter";
import { getTemplatePage } from "../../../routes";
import { SearchIcon } from "../../00-Atoms/Icons/SearchIcon";
import { Line } from "../../00-Atoms/Line/Line";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Heading1 } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";
import { Search } from "../../01-Molecules/Search/Search";

type TemplateMeta = {
  file: string;
  slug: string;
  path: string;
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  version?: string | null;
  updatedAt?: string | null;
  sectionsCount?: number;
  questionsCount?: number;
};

export const TemplatesListPage: FC = () => {
  const [templates, setTemplates] = useState<TemplateMeta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/templates/index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((data: TemplateMeta[]) => setTemplates(data))
      .catch(() => setError("Failed to load templates"));
  }, []);

  const filtered = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Page className="flex flex-col gap-2">
      <Toolstrip>
        <Heading1>Community Templates</Heading1>
      </Toolstrip>
      <Line>Browse curated checklists</Line>
      {error && (
        <div role="alert" className="alert alert-error">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Search
          id="templates-search"
          value={search}
          containerClassname="w-full md:w-60"
          onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
        />
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
            {filtered.length ? "Available templates" : "No templates found"}
          </li>
          {filtered.map((t) => (
            <li key={t.slug} className="list-row">
              <div
                aria-hidden="true"
                role="presentation"
                className="text-warning text-4xl font-black uppercase"
              >
                {t.name?.[0]}
              </div>
              <div>
                <div className="font-medium">
                  <Link className="focusable" to={getTemplatePage(t.slug)}>
                    {t.name}
                  </Link>
                </div>
                <div className="flex gap-1 text-xs font-semibold uppercase opacity-60">
                  {t.description && <div>{t.description}</div>}
                  {typeof t.questionsCount === "number" && (
                    <div>{t.questionsCount} questions</div>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <Link
                  id={`view-template-btn-${t.slug}`}
                  to={getTemplatePage(t.slug)}
                  className="btn btn-square btn-ghost"
                  title={`View Template ${t.name}`}
                  aria-label="View Template"
                >
                  <SearchIcon
                    className="fill-current"
                    width={16}
                    aria-hidden="true"
                    role="presentation"
                  />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
};
