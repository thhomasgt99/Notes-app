require('dotenv').config()//estalinea requiere el modulo instalado pero solo su metodo config, este modulo es para manejar las variables de entorno

const app = require('./server')		//OJO CON ESTO NO SE SI ESTA VEDADERAMENTE CONECTADA LA BASE DE DATOS
require("./database")				


app.listen(app.get('port'),()=>{
	console.log('server on port',app.get('port'))
})