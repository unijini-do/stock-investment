import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { agents, assertDate } from "./project-map.mjs";

const date = assertDate(process.argv[2] || new Date().toISOString().slice(0, 10));
const root = path.resolve("outputs", date);

await mkdir(root, { recursive: true });

for (const agent of agents) {
  await mkdir(path.join(root, agent.id), { recursive: true });
}

const indexPath = path.join(root, "README.md");
const lines = [
  "---",
  `date: ${date}`,
  "type: daily-workspace",
  "status: draft",
  "---",
  "",
  `# ${date} 투자 리서치 작업공간`,
  "",
  ...agents.map((agent) => `- [ ] ${agent.title}: \`${agent.id}/\``),
  ""
];

await writeFile(indexPath, lines.join("\n"), { flag: "wx" }).catch((error) => {
  if (error.code !== "EEXIST") throw error;
});

console.log(root);

