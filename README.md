# Proyecto final backend 2023 (Argentina Programa-4.0)
Construcción de aplicaciones de servidor (back-end). Creación de servicios web que proveen datos a aplicaciones web front-end, aplicaciones de escritorio como también aplicaciones móviles. Creación y administración de bases de datos SQL y noSQL, e integradas éstas a los servicios web.

## API Trailerflix con Node.js, Express y Sequelize

Esta es una API de ejemplo que utiliza Node.js, Express y Sequelize para gestionar una base de datos de películas y series, con sus actores y géneros. A continuación, encontrarás la documentación para utilizar esta API.

## Modelo - Entidad - Relación

### Entidades - Atributos

![Modelo Api Post](https://i.gyazo.com/ec619902fac795cf37fdd64bfccb0178.png)


## Requisitos Previos

Asegúrate de tener Node.js y MySQL instalados en tu sistema antes de ejecutar la aplicación. Además, crea una base de datos MySQL y configura las credenciales en un archivo `.env` en la raíz del proyecto como se muestra en el siguiente ejemplo.

## Archivo `.env`

### Configuración de la base de datos
```plaintext
PORT=3008
DB_HOST=localhost
DB_SCHEMA=mi_basededatos(en este caso, trailerflix)
DB_USERNAME=mi_usuario(en este caso, root)
DB_PASSWORD=mi_contraseña_secreta_de_mysql
```
Asegúrate de que estos valores coincidan con la configuración de tu base de datos y servidor Express.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/urldelproyecto...
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd posts...
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```


El servidor escuchará en el puerto especificado en el archivo `.env` o en el puerto 3000 por defecto.

---

## Tablas SQL, Vista SQL y migración

En la carpeta `migracion` se encuentran los siguientes archivos:

- `createDB.sql`: donde están las instrucciones para crear las tablas SQL requeridas junto con la vista SQL para consumir los datos.
- `inputDB.sql`: donde están las instrucciones para inyectar los datos iniciales dentro de las tablas.
- `jsoncapture.js`: el script que se utilizó para leer el archivo JSON original de los datos, consumirlos y crear el archivo `inputDB.sql`.
- `trailerflix.json`: el JSON original de referencia para los datos de la tabla.

Recuerde editar estos archivos para adaptarlos a sus necesidades.


## Estructura de Carpetas

El proyecto está organizado en la siguiente estructura de carpetas:

- `src/`
  - `config/`: Contiene el archivo `DBManager.js` que establece la conexión a la base de datos MySQL, y el archivo `associations.js` que establece las relaciones con Sequelize de los modelos.
  - `controllers/`: Contiene los distintos archivos que definen los distintos endpoints de la API. En este caso están tanto `actoresController.js` como `catalogoController.js`.
  - `models/`: Contiene los modelos de Sequelize para las tablas `actores`, `catalogo`, `categoria`, `generos`, asi como las tablas intermedias `contenidoActores` y `contenidoGeneros`, y la vista SQL `catalogoView`.
  - `router/`: Contiene los distintos archivos que definen las rutas de la API. en este caso están tanto `actoresRouter.js` como `catalogoRouter.js`.
- `.env`: Archivo de configuración de variables de entorno para la conexión a la base de datos.
- `package.json`: Archivo de configuración de dependencias y scripts.
- `server.js`: Archivo principal que inicia el servidor Express.

Se eligió esta estructura de carpetas para favorecer la modularización y escalabilidad de la API.

## Endpoints

A continuación, se detallan los endpoints disponibles y cómo utilizarlos:

### Catalogo

#### Listar todo el catálogo

- **URL**: `/catalogo`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "id": 1,
        "poster": "/posters/1.jpg",
        "titulo": "Titulo 1",
        "categoria": "Categoria 1",
        "generos": "Genero 1, Genero 2",
        "resumen": "Resumen 1",
        "temporadas": 4,
        "reparto": "Actor 1, Actor 2, Actor 3",
        "trailer": ""
      },
      {
        "id": 2,
        "poster": "/posters/2.jpg",
        "titulo": "Titulo 2",
        "categoria": "Categoria 2",
        "generos": "Genero 1, Genero 2, Genero 3",
        "resumen": "Resumen 2.",
        "temporadas": "N/A",
        "reparto": "Actor 2, Actor 4, Actor 5",
        "trailer": "https://www.trailer2.com"
      }
    ]
    ```

#### Obtener un título por su ID

- **URL**: `/catalogo/:id`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "id": 26,
      "poster": "/posters/26.jpg",
      "titulo": "Titulo 26",
      "categoria": "Categoria 1",
      "generos": "Genero 1, Genero 2",
      "resumen": "Resumen 26",
      "temporadas": 5,
      "reparto": "Actor 1, Actor 2, Actor 3",
      "trailer": ""
    }
    ```

#### Obtener un título por su nombre 

- **URL**: `/catalogo/titulo/:titulo`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "id": 5,
      "poster": "/posters/5.jpg",
      "titulo": "Titulo 5",
      "categoria": "Categoria 1",
      "generos": "Genero 1, Genero 2, Genero 3",
      "resumen": "Resumen 5",
      "temporadas": 1,
      "reparto": "Actor 1, Actor 2, Actor 3",
      "trailer": ""
    }
    ```

#### Listar los títulos de un género

- **URL**: `/catalogo/genero/:genero`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "id": 23,
      "poster": "/posters/23.jpg",
      "titulo": "Titulo 23",
      "categoria": "Categoria 1",
      "generos": "Genero 1, Genero 2",
      "resumen": "Resumen 23",
      "temporadas": 2,
      "reparto": "Actor 1, Actor 2, Actor 3",
      "trailer": ""
    },
    {
      "id": 27,
      "poster": "/posters/27.jpg",
      "titulo": "Titulo 27",
      "categoria": "Categoria 2",
      "generos": "Genero 1, Genero 2, genero 3",
      "resumen": "Resumen 27",
      "temporadas": "N/A",
      "reparto": "Actor 1, Actor 2",
      "trailer": "https://www.trailer27.com"
    },
    {
      "id": 33,
      "poster": "/posters/33.jpg",
      "titulo": "Titulo 33",
      "categoria": "Categoria 1",
      "generos": "Genero 1",
      "resumen": "Resumen 33",
      "temporadas": 1,
      "reparto": "Actor 1, Actor 2, Actor 3",
      "trailer": ""
    }
    ```

#### Listar los títulos de una categoría

- **URL**: `/catalogo/categoria/:categoria`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "id": 3,
      "poster": "/posters/3.jpg",
      "titulo": "Titulo 3",
      "categoria": "Categoria 1",
      "generos": "Genero 1, Genero 2",
      "resumen": "Resumen 3",
      "temporadas": 2,
      "reparto": "Actor 1, Actor 2, Actor 3, Actor 4, Actor 5",
      "trailer": ""
    },
    {
      "id": 4,
      "poster": "/posters/4.jpg",
      "titulo": "Titulo 4",
      "categoria": "Categoria 1",
      "generos": "Genero 1, Genero 2, Genero 3",
      "resumen": "Resumen 4",
      "temporadas": 1,
      "reparto": "Actor 1, Actor 2, Actor 3",
      "trailer": ""
    },
    {
      "id": 8,
      "poster": "/posters/8.jpg",
      "titulo": "Titulo 8",
      "categoria": "Categoria 1",
      "generos": "Genero 1",
      "resumen": "Resumen 8",
      "temporadas": 2,
      "reparto": "Actor 1, Actor 2, Actor 3, Actor 4",
      "trailer": ""
    }
    ```


### Actores

#### Listar todos actores

- **URL**: `/actores`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "id": 1,
        "nombreActor": "Actor 1"
      },
      {
        "id": 2,
        "nombreActor": "Actor 2"
      },
      {
        "id": 3,
        "nombreActor": "Actor 3"
      }
    ]
    ```

#### Listar los títulos de un actor

- **URL**: `/actores/:actor`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "id": 7,
      "poster": "/posters/7.jpg",
      "titulo": "Titulo 7",
      "categoria": "Categoria 1",
      "generos": "Genero 1, Genero 2",
      "resumen": "Resumen 7",
      "temporadas": 2,
      "reparto": "Actor 1, Actor 2, Actor 3, Actor 4, Actor 5",
      "trailer": ""
    },
    {
      "id": 12,
      "poster": "/posters/12.jpg",
      "titulo": "Titulo 12",
      "categoria": "Categoria 2",
      "generos": "Genero 1, Genero 2, Genero 3",
      "resumen": "Resumen 12",
      "temporadas": "N/A",
      "reparto": "Actor 1, Actor 2, Actor 3",
      "trailer": "https://www.trailer12.com"
    },
    {
      "id": 18,
      "poster": "/posters/18.jpg",
      "titulo": "Titulo 18",
      "categoria": "Categoria 1",
      "generos": "Genero 1",
      "resumen": "Resumen 18",
      "temporadas": 2,
      "reparto": "Actor 1, Actor 2, Actor 3, Actor 4",
      "trailer": ""
    }
    ```


### Errores

La API devuelve mensajes de error con los códigos de estado correspondientes en caso de que ocurran problemas. Asegúrate de manejar adecuadamente estos errores en tu aplicación cliente.

## Conclusiones

Puedes utilizar esta API de ejemplo como base para desarrollar tu propia aplicación web o móvil. Asegúrate de personalizarla según tus necesidades específicas, agregar distintos endpoints que creas necesarios y de implementar la seguridad y la autorización adecuadas para proteger tus recursos.

---
