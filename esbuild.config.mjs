import path from "path";
import { fileURLToPath } from "url";
import { build } from "esbuild";
import importGlobPkg from "esbuild-plugin-import-glob";
import { sassPlugin } from "esbuild-sass-plugin";

// Handle CJS/ESM interop
const importGlob = importGlobPkg.default ?? importGlobPkg;

// Emulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const railsEnv = process.env.RAILS_ENV || "development";
const optimize = railsEnv !== "development";

build({
  entryPoints: ["./application.tsx"],
  bundle: true,
  outdir: path.join(__dirname, "app/assets/builds"),
  absWorkingDir: path.join(__dirname, "app/javascript"),
  color: true,
  minify: optimize,
  sourcemap: true,
  watch: process.argv.includes("--watch"),
  loader: { ".js": "jsx", ".tsx": "tsx" },
  plugins: [importGlob(), sassPlugin({ cache: true })],
});
