import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
const svgr = require("@svgr/rollup").default;
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";

export default {
  input: pkg.source,
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "esm" },
  ],
  plugins: [
    external(),
    babel({
      exclude: "node_modules/**",
    }),
    svgr({
      svgoConfig: {
        plugins: {
          removeViewBox: false,
        },
      },
    }),
    //del({ targets: ['dist/*'] }),
    typescript(),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
