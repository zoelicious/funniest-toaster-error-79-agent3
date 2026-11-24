import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const line = "Error E12: Your bread requested a different owner.";

try {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, "entry.txt");
  fs.writeFileSync(target, line + "\n", "utf8");
} catch (err) {
  console.error("failed to write entry:", err);
  process.exit(1);
}

// Self-check (read-only, no repo writes): entry must be one line, 1-120 chars.
const chars = [...line].length;
if (chars < 1 || chars > 120 || line.includes("\n")) {
  console.error("entry failed length check:", chars);
  process.exit(1);
}
