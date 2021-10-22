import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

const config = {
	input: "src/main.js",
	output: {
		file: "dist/bundle.js",
		format: "iife",
		sourcemap: true,
	},
	plugins: [
		nodeResolve({
			extensions: [".js"],
		}),
		replace({
			preventAssignment: true,
			"process.env.NODE_ENV": JSON.stringify("development"),
		}),
		babel({
			extensions: [".js"],
			babelHelpers: "bundled",
			presets: [
				[
					"@babel/preset-env",
					{
						loose: true,
					},
				],
				"@babel/preset-react",
			],
			env: {
				development: {
					compact: false,
				},
			},
		}),
		commonjs(),
		serve({
			open: true,
			verbose: true,
			contentBase: ["", "public"],
			host: "localhost",
			port: 3000,
		}),
		livereload({ watch: "dist" }),
	],
};

export default config;
