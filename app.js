const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Bienvenido a la aplicación JWT. Ve al login para comenzar.')
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
});