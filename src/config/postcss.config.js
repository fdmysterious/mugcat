module.exports = ({ file, options, env }) => ({
	parser: file.extname === '.sss' ? 'sugarss' : false,

	// TODO // Add production env check
	plugins: {
		'autoprefixer': { add : true },
		'cssnano'     : true
	}
})
