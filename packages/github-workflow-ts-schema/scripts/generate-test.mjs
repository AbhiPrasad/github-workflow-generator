// These are some experiments

import { join } from "node:path";
import { promises } from "node:fs";

import * as recast from "recast";
import { parseModule, generateCode } from "magicast";

import { compileFromFile } from "json-schema-to-typescript";

const b = recast.types.builders;

const [tsFile, licenseFile] = await Promise.all([
  compileFromFile(join("src", "vendor", "schema.json"), {
    strictIndexSignatures: true,
  }),
  promises.readFile(join("src", "vendor", "LICENSE"), "utf-8"),
]);

const mod = await parseModule(tsFile);

for (let x = 0; x < mod.exports.$ast.body.length; x++) {
  const node = mod.exports.$ast.body[x];
  if (
    node.type === "ExportNamedDeclaration" &&
    node.declaration.type === "TSTypeAliasDeclaration" &&
    node.declaration.id.name === "Ref"
  ) {
    log(node.declaration.typeAnnotation.types[0].members[1].typeAnnotation);
    // log(
    // node.declaration.typeAnnotation.types[0].members[1].typeAnnotation =
    // ;
    // );
    // node.declaration.typeAnnotation.types[0].members[1].optional = true;
  }
}

// console.log(b.newExpression(b.typeAnnotation("Ref"), []));

// const { code } = generateCode(mod);

// await promises.writeFile(
//   join("src", "index.ts"),
//   `/**${licenseFile}*/\n\n${code}`
// );

function log(x) {
  console.log({ ...x, loc: undefined });
}
