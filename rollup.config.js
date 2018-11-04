import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default [
  {
    input: "./src/slot-router.ts",
    output: {
      file: pkg.module,
      format: "es"
    },
    plugins: [
      typescript({
        tsconfig: "tsconfig.json"
      })
    ]
  }
];
