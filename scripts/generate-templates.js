// Generates public/templates/index.json from JSON files in public/templates
// Run before dev/build so the app can list community templates without directory listing.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const TEMPLATES_DIR = join(process.cwd(), "public", "templates");
const OUT_FILE = join(TEMPLATES_DIR, "index.json");

const main = async () => {
  await mkdir(TEMPLATES_DIR, { recursive: true });
  const files = (await readdir(TEMPLATES_DIR)).filter(
    (f) => f.endsWith(".json") && f !== "index.json",
  );

  const entries = [];
  for (const file of files) {
    try {
      const raw = await readFile(join(TEMPLATES_DIR, file), "utf8");
      const json = JSON.parse(raw);
      const slug = file.replace(/\.json$/i, "");
      const sections = Array.isArray(json.sections) ? json.sections : [];
      const sectionsCount = sections.length;
      const questionsCount = sections.reduce(
        (acc, s) =>
          acc + (Array.isArray(s?.questions) ? s.questions.length : 0),
        0,
      );
      entries.push({
        file,
        slug,
        path: `/templates/${file}`,
        id: json.id || slug,
        name: json.name || slug,
        description: json.description || "",
        tags: json.tags || [],
        version: json.version || null,
        updatedAt: json.updatedAt || null,
        sectionsCount,
        questionsCount,
      });
    } catch (e) {
      // Skip invalid JSON files but keep going
      console.warn(`[templates] Skipping ${file}: ${e.message}`);
    }
  }

  // Sort by name for stable display
  entries.sort((a, b) => a.name.localeCompare(b.name));
  await writeFile(OUT_FILE, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  console.log(
    `[templates] Wrote index for ${entries.length} templates -> ${OUT_FILE}`,
  );
};

main().catch((err) => {
  console.error("[templates] Failed to generate index:", err);
  process.exit(1);
});
