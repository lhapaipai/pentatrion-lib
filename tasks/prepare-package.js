import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fse from 'fs-extra';

const baseDir = dirname(fileURLToPath(import.meta.url));
const buildDir = path.resolve(baseDir, "../dist");

async function main() {
  const pkg = await fse.readJSON(path.resolve(baseDir, '../package.json'));

  pkg.main = "index.js";
  pkg.types = "index.d.ts";
  delete pkg.devDependencies;
  delete pkg.private;
  delete pkg.files;
  delete pkg.scripts;

  await fse.writeJSON(path.join(buildDir, 'package.json'), pkg, {spaces: 2});

  await fse.copyFile(
    path.resolve(baseDir, '../README.md'),
    path.join(buildDir, 'README.md')
  );
}

main().catch(err => {
  process.stderr.write(`${err.message}\n`, () => process.exit(1));
});
