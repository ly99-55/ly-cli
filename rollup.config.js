import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default defineConfig({
    input: "src/index.ts", // 入口文件
    output: { 
        dir:'dist',  // 输出
        format: "cjs", //输出commonjs模块格式
    },
    plugins: [
        nodeResolve(),
        externals({
            devDeps:false  // 排除devDependencies模块，不打包进bundle中
        }),
        commonjs(),
        json(),
        typescript({ useTsconfigDeclarationDir: true }),
        terser()
    ],
   
})