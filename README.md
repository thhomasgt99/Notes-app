# `CRUD NODE APP`

## Environment variables
- PORT, This is several port. by default is 3000
- NOTES_APP_MONGODB_HOST = localhost
- NOTES_APP_MONGODB_DATABASE = notes-app

---
## Modulos principales a instalar de desarrollo y e internas: 

- npm i express connect-flash  bcryptjs express-handlebars express-session method-override mongoose passport passport-local
- npm i dotenv nodemon npm-check-updates -D

- express            -> Framework de servidor 
- connect-flash      -> Para enviar mensajes entre las vistas de la app/ lo utilizaremos con express-session
- bcryptjs           -> Modulo de cifrado, para cifrar cosas como contraseñas
- express-handlebars -> Para crear algunas vistas que se convertiran en html UTILIZAR LA VERSION ^3.1.0 las modernas no son compaibles//ESTUDIAR
- handlebars         -> Depende de express-handlebars , esto es para evitar errores que tiene express-handlebars especificamente la version @4.5.0 
- express-session    -> Para guardar algunos datos desde la memoria del cervidor
- method-override    -> Para enviar peticines put o delete desde las las vistas, estos dos metosdos normalmente no se pueden realizar desde formularios
- mongoose           -> Para manejar la vace de datos
- passport           -> Para manejar el login
- passport-local	   -> Para manejar la base de datos local especificamente pq passport tambien hay para autenticarnos con servicon con google, facebool, twiter , etc
- morgan             -> Muetra o lista las peticiones que van llegando

- -D
- dotenv 		         -> Para utilizar variables de entorno
- nodemon            -> Para reiniciar el cervidor cada vez que hacemos un cambio
- npm-check-updates  -> Para supervisar si los modulos tienen actualizaciones 
---

## estructuras de carpetas iniciales:

- config             -> Para  configurar algunos modulos
- controllers        -> Para guardar funcones para cuando un usuario bisite la ruta de nuestro cevidor
- helpers            -> Para colocar algunas funciones que luego desde la vista hagan algo
- models             -> Para almacenar los esquemas que seran utilizados en mongo
- public             -> Para  almacenar archivos publicos como css o imagenes
- routes             -> Para crear las rutas del cervidor
- viws               -> Para almacenar los archivos de html que vamos a estar enviando al navegador

---
## Prueba
#### tengo dos usuarios de prueba
- joe@gmail.com  clave:1234
- john@gmail.com clave:1234

---
