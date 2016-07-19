'use strict'

const fs = require('fs')
const Remarkable = require('remarkable')



const md = new Remarkable({typographer: true})
md.core.ruler.disable(['del'])
md.core.ruler.enable(['abbreviations', 'footnotes'])



const update = (req, res, next) => {
}
module.exports = update
