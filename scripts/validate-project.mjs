import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { agents } from "./project-map.mjs";

const required = [
  "AGENTS.md",
  "orchestrator/INSTRUCTIONS.md",
  "shared/PREFERENCES.md",
  "shared/STORAGE.md",
  "shared/OUTPUT_CONTRACT.md",
  "templates/dashboard.html",
  "orchestrator/references/agent_registry.md",
  "orchestrator/references/local_storage_map.md",
  "agents/06b-pine-builder/references/backtest_table.md",
  ...agents.slice(1).map((agent) => `agents/${agent.id}/INSTRUCTIONS.md`)
];

const skills = [
  "analyze-macro-regime",
  "extract-etf-leaders",
  "analyze-community-sentiment",
  "build-swing-briefing",
  "analyze-fundamentals",
  "study-investing-masters",
  "build-pine-strategy",
  "manage-trade-journal",
  "review-portfolio"
];

for (const skill of skills) {
  required.push(
    `.codex/skills/${skill}/SKILL.md`,
    `.codex/skills/${skill}/agents/openai.yaml`,
    `.codex/skills/${skill}/references/complete-instructions.md`,
    `.codex/skills/${skill}/assets/dashboard.html`
  );
}

for (const file of required) {
  await access(path.resolve(file));
}

const instructionFiles = required.filter((file) => file.endsWith(".md"));
const forbidden = [];

for (const file of instructionFiles) {
  const content = await readFile(file, "utf8");
  if (/notion|노션/i.test(content)) forbidden.push(file);
}

if (forbidden.length) {
  throw new Error(`외부 DB 저장 문구가 남아 있습니다: ${forbidden.join(", ")}`);
}

for (const skill of skills) {
  const file = `.codex/skills/${skill}/SKILL.md`;
  const content = await readFile(file, "utf8");
  if (content.includes("TODO")) throw new Error(`${file}: TODO가 남아 있습니다.`);
  if (!content.startsWith(`---\nname: ${skill}\n`)) {
    throw new Error(`${file}: 스킬 이름 또는 frontmatter가 올바르지 않습니다.`);
  }
}

console.log(`검증 완료: 필수 파일 ${required.length}개, 프로젝트 스킬 ${skills.length}개`);
