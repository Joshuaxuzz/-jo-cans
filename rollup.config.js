import babel from 'rollup-plugin-babel'
const production = !JSON.parse(process.env.ROLLUP_WATCH || false)

const proConfig = [
	{
		input: 'src/index.js',
		output: [
			{
				file: 'dist/cans.es.js',
				format: 'es', // immediately-invoked function expression — suitable for <script> tags
				name: 'Cans',
				sourcemap: true
			},
			{
				file: 'dist/cans.umd.js',
				format: 'umd', // immediately-invoked function expression — suitable for <script> tags
				name: 'Cans',
				sourcemap: true
			},
			{
				file: 'dist/cans.js',
				format: 'iife', // immediately-invoked function expression — suitable for <script> tags
				name: 'Cans',
				sourcemap: true
			},
			{
				file: 'dist/cans.amd.js',
				format: 'amd', // immediately-invoked function expression — suitable for <script> tags
				sourcemap: true
			},
			{
				file: 'dist/cans.cjs.js',
				format: 'cjs', // immediately-invoked function expression — suitable for <script> tags
				sourcemap: true
			}
		],
		plugins: [
			babel({
				exclude: 'node_modules/**'
			}),
		]
	}
]

const devConfig = {
	input: 'public/index.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	}
}

export default production ? proConfig : devConfig