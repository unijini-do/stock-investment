import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const mappings = [
  ["analyze-macro-regime", "agents/01-macro-regime"],
  ["extract-etf-leaders", "agents/02-etf-leader"],
  ["analyze-community-sentiment", "agents/03-community-sentiment"],
  ["build-swing-briefing", "agents/04-swing-briefing"],
  ["analyze-fundamentals", "agents/05-fundamental"],
  ["study-investing-masters", "agents/06a-masters-advisor"],
  ["build-pine-strategy", "agents/06b-pine-builder"],
  ["manage-trade-journal", "agents/07-trade-journal"],
  ["review-portfolio", "agents/08-portfolio-manager"]
];

for (const [skillName, agentDirectory] of mappings) {
  const skillDirectory = path.resolve(".codex", "skills", skillName);
  const references = path.join(skillDirectory, "references");
  const assets = path.join(skillDirectory, "assets");

  await rm(references, { recursive: true, force: true });
  await mkdir(references, { recursive: true });
  await cp(
    path.resolve(agentDirectory, "INSTRUCTIONS.md"),
    path.join(references, "complete-instructions.md")
  );

  await cp(path.resolve(agentDirectory, "references"), references, {
    recursive: true,
    force: true
  }).catch((error) => {
    if (error.code !== "ENOENT") throw error;
  });

  await mkdir(assets, { recursive: true });
  await cp(path.resolve("templates", "dashboard.html"), path.join(assets, "dashboard.html"));
  await cp(path.resolve("templates", "report.md"), path.join(assets, "report.md"));
}

console.log(`스킬 리소스 동기화 완료: ${mappings.length}개`);

