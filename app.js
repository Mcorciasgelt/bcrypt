const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const { secret } = require('./crypto/config')
const session = require('express-session')
const usersRouter = require("./routes/users")

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use("/", usersRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
});