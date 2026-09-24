import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url);
const canonical = readFileSync(new URL("SKILL.md", root), "utf8");
const compat = readFileSync(new URL("skill/SKILL.md", root), "utf8");

if (canonical !== compat) {
  console.error("SKILL.md and skill/SKILL.md differ. Keep them identical.");
  process.exit(1);
}

console.log("skill copies match");
