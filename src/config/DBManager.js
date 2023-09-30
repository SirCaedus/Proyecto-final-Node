const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const { DB_SCHEMA, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env

const db = new Sequelize(DB_SCHEMA, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5, // Máximo de conexiones en el grupo
        min: 0, // Mínimo de conexiones en el grupo
        acquire: 30000, // Tiempo máximo, para liberar conexiones inactivas
        idle: 10000, // Tiempo máximo para cerrar conexiones inactivas
      },
    define: { timestamps: false }
})

module.exports = { db }