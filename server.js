require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const home = require('./routes/router')
app.use('/', home)

const port = process.env.port || 6000

app.listen(port, () => {
    console.log(`We have connected with this ${port}`);
})