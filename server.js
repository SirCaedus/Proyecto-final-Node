const express = require('express')
const app = express()

const { db } = require('./src/config/DBManager')

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(async (req, res, next) => {
    try {
          await db.authenticate()
          next()
    } catch (error) {
          res.status(500).json({ error: 'Error en el servidor', description: error.message })
    }
})

const catalogoRouter = require('./src/router/catalogoRouter')
const actoresRouter = require('./src/router/actoresRouter')

app.get('/', (req,res) => {
    res.status(200).end('Bienvenido a la API de Trailerflix!')
})

app.use('/', catalogoRouter)
app.use('/', actoresRouter)


app.use('*', (req,res) => {
    res.status(404).send('Error 404: URI no existente')
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})