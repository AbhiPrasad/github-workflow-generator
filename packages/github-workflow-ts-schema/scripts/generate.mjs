import { join } from "node:path";
import { promises } from "node:fs";

import { compileFromFile } from "json-schema-to-typescript";

const [tsFile, licenseFile] = await Promise.all([
  compileFromFile(join("src", "vendor", "schema.json"), {
    strictIndexSignatures: true,
  }),
  promises.readFile(join("src", "vendor", "LICENSE"), "utf-8"),
]);

await promises.writeFile(
  join("src", "index.ts"),
  `/**${licenseFile}*/\n\n${tsFile}`
);
