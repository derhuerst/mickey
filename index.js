'use strict'

const cfg = require('config')
const express = require('express')

const view = require('./view')



const app = express()

app.listen(cfg.port)
