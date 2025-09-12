# 🎬 API de Películas

API REST para gestionar películas, series y medios audiovisuales construida con Node.js, Express y MongoDB Atlas.

## 🚀 Características

- **CRUD completo** para géneros, directores, productoras, tipos y medios
- **Base de datos MongoDB** con Mongoose ODM
- **Documentación automática** con Swagger
- **Validación de datos** con esquemas de Mongoose
- **Relaciones entre entidades** con referencias pobladas
- **API RESTful** siguiendo mejores prácticas

## 📋 Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) (gratuita)
- [Git](https://git-scm.com/) (opcional)

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd peliculas-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=4000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/peliculas?retryWrites=true&w=majority
NODE_ENV=development
```

**Nota**: Reemplaza `usuario`, `password` y `cluster.mongodb.net` con tus credenciales de MongoDB Atlas.

## 🚀 Ejecutar la aplicación

### Modo desarrollo (con recarga automática)

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

La API estará disponible en: `http://localhost:4000`

## 📚 Documentación de la API

### Swagger UI

Una vez ejecutando, accede a la documentación interactiva en:

```
http://localhost:4000/api-docs
```

### Endpoints disponibles

#### Géneros

- `GET /api/v1/generos` - Obtener todos los géneros
- `GET /api/v1/generos/:id` - Obtener género por ID
- `POST /api/v1/generos` - Crear nuevo género
- `PUT /api/v1/generos/:id` - Actualizar género
- `DELETE /api/v1/generos/:id` - Eliminar género

#### Directores

- `GET /api/v1/directores` - Obtener todos los directores
- `GET /api/v1/directores/:id` - Obtener director por ID
- `POST /api/v1/directores` - Crear nuevo director
- `PUT /api/v1/directores/:id` - Actualizar director
- `DELETE /api/v1/directores/:id` - Eliminar director

#### Productoras

- `GET /api/v1/productoras` - Obtener todas las productoras
- `GET /api/v1/productoras/:id` - Obtener productora por ID
- `POST /api/v1/productoras` - Crear nueva productora
- `PUT /api/v1/productoras/:id` - Actualizar productora
- `DELETE /api/v1/productoras/:id` - Eliminar productora

#### Tipos

- `GET /api/v1/tipos` - Obtener todos los tipos
- `GET /api/v1/tipos/:id` - Obtener tipo por ID
- `POST /api/v1/tipos` - Crear nuevo tipo
- `PUT /api/v1/tipos/:id` - Actualizar tipo
- `DELETE /api/v1/tipos/:id` - Eliminar tipo

#### Media

- `GET /api/v1/media` - Obtener todos los medios
- `GET /api/v1/media/:id` - Obtener medio por ID
- `POST /api/v1/media` - Crear nuevo medio
- `PUT /api/v1/media/:id` - Actualizar medio
- `DELETE /api/v1/media/:id` - Eliminar medio

## 🧪 Probar la API

### Con Postman

#### 1. Configuración básica

- **Base URL**: `http://localhost:4000`
- **Headers**: `Content-Type: application/json`

#### 2. Orden recomendado para crear datos

1. **Crear Género**

   ```json
   POST /api/v1/generos
   {
     "nombre": "Acción",
     "descripcion": "Películas de acción y aventura"
   }
   ```

2. **Crear Director**

   ```json
   POST /api/v1/directores
   {
     "nombre": "Christopher Nolan",
     "biografia": "Director británico-estadounidense",
     "fechaNacimiento": "1970-07-30"
   }
   ```

3. **Crear Productora**

   ```json
   POST /api/v1/productoras
   {
     "nombre": "Warner Bros.",
     "descripcion": "Estudio de cine estadounidense",
     "fechaFundacion": "1923-04-04"
   }
   ```

4. **Crear Tipo**

   ```json
   POST /api/v1/tipos
   {
     "nombre": "Película",
     "descripcion": "Contenido audiovisual de larga duración"
   }
   ```

5. **Crear Media** (usando los IDs obtenidos)
   ```json
   POST /api/v1/media
   {
     "serial": "MED001",
     "titulo": "Inception",
     "sinopsis": "Un ladrón experto en el arte de la extracción",
     "url_pelicula": "https://ejemplo.com/inception.mp4",
     "imagen_portada": "https://ejemplo.com/inception-poster.jpg",
     "anio_estreno": 2010,
     "genero": "ID_DEL_GENERO",
     "director": "ID_DEL_DIRECTOR",
     "productora": "ID_DE_LA_PRODUCTORA",
     "tipo": "ID_DEL_TIPO"
   }
   ```

### Con cURL

#### Probar conexión

```bash
curl http://localhost:4000/
```

#### Obtener géneros

```bash
curl http://localhost:4000/api/v1/generos
```

#### Crear género

```bash
curl -X POST http://localhost:4000/api/v1/generos \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Acción", "descripcion": "Películas de acción"}'
```

## 📁 Estructura del proyecto

```
peliculas-api/
├── src/
│   ├── app.js              # Archivo principal de la aplicación
│   ├── database.js         # Configuración de MongoDB
│   ├── swagger.js          # Configuración de Swagger
│   ├── models/             # Modelos de Mongoose
│   │   ├── genero.js
│   │   ├── director.js
│   │   ├── productora.js
│   │   ├── tipo.js
│   │   └── media.js
│   └── Routes/             # Rutas de la API
│       ├── genero.routes.js
│       ├── director.routes.js
│       ├── productora.routes.js
│       ├── tipo.routes.js
│       └── media.routes.js
├── package.json
├── .env                    # Variables de entorno (crear)
└── README.md
```

## 🔧 Scripts disponibles

```bash
npm start      # Ejecutar en producción
npm run dev    # Ejecutar en desarrollo con nodemon
```
