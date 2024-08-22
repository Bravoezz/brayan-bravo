
# XYZ Boutique API

Este proyecto es una API para la gestión de productos en XYZ Boutique, desarrollada con el framework [NestJS](https://github.com/nestjs/nest) utilizando TypeScript.

## Descripción

Este repositorio es un punto de partida para el desarrollo de APIs con NestJS. Incluye configuraciones de Swagger para la documentación de la API, manejo global de excepciones, validaciones automáticas y más.

## Instalación

Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados.

\`\`\`bash
$ npm install
\`\`\`

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar las variables de entorno. Puedes hacerlo creando un archivo \`.env\` en la raíz del proyecto con el siguiente contenido:

# Base de datos
DATABASE_URL="mssql://usuario:contraseña@localhost:1433/base_de_datos"
SHADOW_DATABASE_URL="mssql://usuario:contraseña@localhost:1433/shadow_base_de_datos"

# JWT
JWT_SECRET="tu_secreto_jwt"      
JWT_EXPIRES="3600s"

## Ejecución de la aplicación

# Modo desarrollo
$ npm run start

# Modo watch (desarrollo con reinicio automático)
$ npm run start:dev

# Modo producción
$ npm run start:prod
\`\`\`

## Documentación de la API

La documentación de la API generada por Swagger está disponible en:

\`\`\`
http://localhost:4000/api/v1/docs
\`\`\`


Link del proyecto desplegado

\`\`\`
https://brayan-bravo-technical-test.onrender.com/api/v1/docs
\`\`\`


## Pruebas
# Pruebas unitarias
$ npm run test

## Contacto

- Autor: [Brayan Bravo](mailto:bravoezz315@gmail.com)
- GitHub: [bravoezz](https://github.com/bravoezz)