'use strict'

const Remarkable = require('remarkable')



const md = new Remarkable({typographer: true})
md.inline.ruler.disable(['del'])
md.core.ruler.enable(['abbr'])
md.block.ruler.enable(['footnote'])



const render = (data) => md.render(data)

module.exports = render
