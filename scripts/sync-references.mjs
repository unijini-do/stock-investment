import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const sources = [
  { file: "orchestrator/INSTRUCTIONS.md", names: ["agent_registry", "local_storage_map"] },
  { file: "agents/01-macro-regime/INSTRUCTIONS.md", names: ["indicators", "regime_playbook"] },
  { file: "agents/02-etf-leader/INSTRUCTIONS.md", names: ["data_sources", "extraction_method"] },
  { file: "agents/03-community-sentiment/INSTRUCTIONS.md", names: ["sentiment_cycle", "sources"] },
  { file: "agents/04-swing-briefing/INSTRUCTIONS.md", names: ["design_system", "macro_calendar"] },
  { file: "agents/05-fundamental/INSTRUCTIONS.md", names: ["analysis_framework", "data_sources"] },
  {
    file: "agents/06b-pine-builder/INSTRUCTIONS.md",
    names: [
      "pine_v6_rules",
      "common_errors",
      "indicator_map",
      "backtest_table",
      "improvement_loop",
      "strategy_archetypes"
    ]
  }
];

for (const source of sources) {
  const content = await readFile(source.file, "utf8");
  const matches = [...content.matchAll(/^## 참조: ([^\n]+)$/gm)];
  const destination = path.join(path.dirname(source.file), "references");
  await mkdir(destination, { recursive: true });

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const name = match[1].trim();
    if (!source.names.includes(name)) continue;

    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? content.length;
    const body = content.slice(start, end).trim();
    await writeFile(path.join(destination, `${name}.md`), `${body}\n`);
  }
}

console.log("에이전트 참조 파일 동기화 완료");

