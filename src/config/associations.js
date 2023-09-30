const Actores = require('../models/actores.js')
const Generos = require('../models/generos.js')
const Catalogo = require('../models/catalogo.js')
const Categoria = require('../models/categoria.js')
const ContenidoActores = require('../models/contenidoActores.js')
const ContenidoGeneros = require('../models/contenidoGeneros.js')
const CatalogoView = require('../models/catalogoView.js')

//configurar relaciones
Categoria.hasOne(Catalogo,{foreignKey: 'idCategoria'})
Catalogo.belongsTo(Categoria,{foreignKey: 'idCategoria'})

Catalogo.belongsToMany(Actores, {through: ContenidoActores})
Actores.belongsToMany(Catalogo, {through: ContenidoActores})

Catalogo.belongsToMany(Generos, {through: ContenidoGeneros})
Generos.belongsToMany(Catalogo, {through: ContenidoGeneros})

module.exports = {
    Actores,
    Generos,
    Catalogo,
    Categoria,
    ContenidoActores,
    ContenidoGeneros,
    CatalogoView
}