'use strict'

const fs = require('fs-promise')
const cfg = require('config')
const path = require('path')



const exists = (slug) =>
	fs.stat(path.join(cfg.dir, slug + '.md'))
	.then((stats) => stats.isFile(), (err) => {
		if (err.code === 'ENOENT') return false
		else throw err
	})



module.exports = {exists}
