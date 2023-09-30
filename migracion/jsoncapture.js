const fs = require('fs')

//lee el archivo del JSON trailerflix y lo adapta a un array
const data = fs.readFileSync(__dirname + '/trailerflix.json','utf8')
const titulos = JSON.parse(data)

// en los array voy a guardar los diferentes generos y actores que hay en todo el archivo
const genero = []
const reparto = []
const titulo_reg = []

//contadores para los id
let cont_genero=0 
let cont_reparto=0 

//regex que va a separar y transformar en array a las cadenas....."Drama, Hechos verídicos" de cada titulo
const regex = /\s?([^,]+)/g

//arrays auxiliares para los generos y actores por titulo
let arr_generos=[] 
let arr_reparto=[] 

//este for recorre todo el JSON
for (let titulo of titulos) {
  //inicializo los array auxiliares en cada nueva vuelta
  arr_generos=[] 
  arr_reparto=[] 
  
  //lo que sigue separa la cadena "Drama, Hechos verídicos" y la transforma en un array 
  //el array devuelto lo recorre con un "map" para quitarle espacios innecesarios con trim
  //el array devuelto lo recorre un foreach y agrega el genero en caso de que no exista en el array genero y 
  //en el arr_generos del titulo en curso

  titulo.genero   
    .match(regex)
    .map((elemento) => elemento.trim())
    .forEach(function (elemento) {
      let ubicaEn=genero.find(genelemento=>genelemento.genero===elemento)
      if (ubicaEn === undefined) {
        genero.push({id:++cont_genero,genero:elemento})
        arr_generos.push({
          idTitulo:titulo.id,
          idGenero:cont_genero,
          titulo:elemento
          }) 
      } else {
          arr_generos.push({
              idTitulo:titulo.id,
              idGenero:ubicaEn.id,
              titulo:ubicaEn.genero
          })
      }
    })

  // lo mismo que lo anterior pero para los actores  

  titulo.reparto
    .match(regex)
    .map((elemento) => elemento.trim())
    .forEach(function (elemento) {
      let ubicaEn=reparto.find(repelemento=>repelemento.actor===elemento)
      if (ubicaEn === undefined) {
        reparto.push({id:++cont_reparto,actor:elemento})
        arr_reparto.push({
          idTitulo:titulo.id,
          idActor:cont_reparto,
          actor:elemento
        })
      }else{
        arr_reparto.push({
          idTitulo:titulo.id,
          idActor:ubicaEn.id,
          actor:ubicaEn.actor
        })
      }
    })

  //almacena el resto de la info del titulo en el array titulo_reg
  titulo_reg.push(
    { id:titulo.id,
      poster:titulo.poster,
      titulo:titulo.titulo,
      categoria:titulo.categoria==="Serie"?1:2,
      genero_str:titulo.genero,
      genero:arr_generos,
      resumen:titulo.resumen,
      temporadas:isNaN(parseInt(titulo.temporadas))?null:parseInt(titulo.temporadas),
      reparto:arr_reparto,
      trailer:titulo.trailer
    })
}

// funciones de insercion de datos
function inserta_categoria(){
  fs.writeFileSync('inputDB.sql', 'insert into categoria(id,nombre) values("1","Serie"); \n', function (err) {
    if (err) throw err
    console.log('Guardado!')
  })

  fs.appendFileSync('inputDB.sql', 'insert into categoria(id,nombre) values("2","Película"); \n', function (err) {
    if (err) throw err
    console.log('Guardado!')
  })
}

function inserta_actores(){
  for(let actor of reparto){
    fs.appendFileSync('inputDB.sql', 'insert into actores(id,nombre) values('+actor.id+',"'+actor.actor+'"); \n', function (err) {
      if (err) throw err
      console.log('Guardado!')
    })
  }

}

function inserta_generos(){
  // idem anterior
  for(let gen of genero){
    fs.appendFileSync('inputDB.sql', 'insert into generos(id,nombre) values('+gen.id+',"'+gen.genero+'"); \n', function (err) {
      if (err) throw err
      console.log('Guardado!')
    })
  }
}

function inserta_genero_titulo(){
  for(let titulo of titulo_reg){
    for(let tit_gen of titulo.genero){
      fs.appendFileSync('inputDB.sql', 'insert into contenidogeneros(idCatalogo,idGenero) values('+tit_gen.idTitulo+','+tit_gen.idGenero+'); \n', function (err) {
        if (err) throw err
        console.log('Guardado!')
      })
    }
  }
}

function inserta_reparto_titulo(){
  for(let titulo of titulo_reg){
    for(let tit_reparto of titulo.reparto){
      fs.appendFileSync('inputDB.sql', 'insert into contenidoactores(idCatalogo,idActor) values('+tit_reparto.idTitulo+','+tit_reparto.idActor+'); \n', function (err) {
        if (err) throw err
        console.log('Guardado!')
      })
    }
  }
}

function inserta_titulo(){
  for(let titulo of titulo_reg){
    fs.appendFileSync('inputDB.sql', 'insert into catalogo(id,poster,titulo,idCategoria,resumen,temporadas,trailer) values('+
          titulo.id+',"'+
          titulo.poster+'","'+
          titulo.titulo+'","'+
          titulo.categoria+'","'+
          titulo.resumen+'",'+
          titulo.temporadas+',"'+
          titulo.trailer+
      '"); \n', function (err) {
      if (err) throw err
      console.log('Guardado!')
    })
  }
}

//con toda la info recolectada se ingresan los registros correspondientes
inserta_categoria()
inserta_actores()
inserta_generos()
inserta_titulo()
inserta_genero_titulo()
inserta_reparto_titulo()