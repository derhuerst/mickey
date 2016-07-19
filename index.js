'use strict'

const cfg = require('config')
const express = require('express')

const assets = require('./routes/lib/assets')
const exists = require('./routes/lib/exists')
const oops = require('./routes/lib/oops')
const tpl = require('./tpl/engine')

const view = require('./routes/view')
const history = require('./routes/history')



const app = express()
app.use('/assets', assets)
app.use(tpl)

app.get('/', index)
app.get('/:slug', exists, view)
app.get('/:slug/history', exists, history)
app.get('/:slug/at/:hash', exists, view)

app.use(oops)
app.listen(cfg.port)
