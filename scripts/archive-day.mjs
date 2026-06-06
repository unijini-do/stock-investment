import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { agents, assertDate } from "./project-map.mjs";

const args = process.argv.slice(2);
const date = assertDate(args[0] || new Date().toISOString().slice(0, 10));
const vaultFlag = args.indexOf("--vault");
const vaultArg = vaultFlag >= 0 ? args[vaultFlag + 1] : null;
const vault = path.resolve(vaultArg || process.env.OBSIDIAN_VAULT || "obsidian-vault");
const source = path.resolve("outputs", date);

async function filesIn(directory) {
  try {
    return (await readdir(directory, { withFileTypes: true }))
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .sort();
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

const links = [];

for (const agent of agents) {
  const agentSource = path.join(source, agent.id);
  const files = await filesIn(agentSource);

  for (const file of files) {
    const extension = path.extname(file).toLowerCase();
    const base = path.basename(file, extension);
    const sourceFile = path.join(agentSource, file);

    if (extension === ".md") {
      const targetDir = path.join(vault, agent.vault);
      const targetName = `${date}--${agent.id}--${base}.md`;
      await mkdir(targetDir, { recursive: true });
      await cp(sourceFile, path.join(targetDir, targetName), { force: true });
      links.push({
        title: `${agent.title} - ${base}`,
        wiki: `${agent.vault}/${date}--${agent.id}--${base}`
      });
    }

    if (extension === ".html") {
      const targetDir = path.join(vault, "90-HTML", date, agent.id);
      await mkdir(targetDir, { recursive: true });
      await cp(sourceFile, path.join(targetDir, file), { force: true });
    }

    if (extension === ".json") {
      const targetDir = path.join(vault, "00-Inbox", "_data", date, agent.id);
      await mkdir(targetDir, { recursive: true });
      await cp(sourceFile, path.join(targetDir, file), { force: true });
    }
  }
}

await mkdir(path.join(vault, "01-Daily"), { recursive: true });
const dailyNote = [
  "---",
  `date: ${date}`,
  "type: investment-daily",
  "tags: [투자리서치, 데일리]",
  "---",
  "",
  `# ${date} 투자 리서치`,
  "",
  "## 오늘의 문서",
  "",
  ...(links.length ? links.map((item) => `- [[${item.wiki}|${item.title}]]`) : ["- 정리할 Markdown 문서가 없습니다."]),
  "",
  "## 오늘의 결정",
  "",
  "- ",
  "",
  "## 내일 확인할 것",
  "",
  "- ",
  ""
].join("\n");

await writeFile(path.join(vault, "01-Daily", `${date}.md`), dailyNote);
console.log(`Obsidian 정리 완료: ${path.join(vault, "01-Daily", `${date}.md`)}`);

