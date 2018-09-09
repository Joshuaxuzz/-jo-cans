import babel from 'rollup-plugin-babel'
const production = !JSON.parse(process.env.ROLLUP_WATCH || false)

const proConfig = {
	input: 'src/index.js',
	output: {
		file: 'dist/cans.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		name: 'Cans',
		sourcemap: true
	},
	plugins: [
		babel({
			exclude: 'node_modules/**'
		})
	]
}

const devConfig = {
	input: 'public/index.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
	]
}

export default production ? proConfig : devConfig