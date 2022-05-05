const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override') //esto es para pder utilizar metodos delete en formularios, pero se hace desde aqui
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

//Initialization
const app = express()
require('./config/passport')

//Settings
app.set('port',process.env.PORT || 4000)//proces da acceso al sistema 
app.set('views',path.join(__dirname,'views'))//__dirname es una const de node, que nos da la ruta dependiendo del sistema operativo hasta src
																							//path.join es un modulo que nos ayudara con la concatenacion de dirname y la demas ruta
																						//ya que en linux las rutas van con \\ y no con //, join nos ayuda con estas compatiilidades
app.engine('.hbs' , exphbs({  //Motor de platilla, configuracion
	defaultLayout: 'main',
	layoutDir: path.join(app.get('views'),'layouts'),
	partialsDir: path.join(app.get('views'),'partials'),
	extname: '.hbs'
}))
app.set('view engine', '.hbs')//Esta linea es para declarar quie va a ser el motor de platillas, llamamos a hbs que es un nobre arbi

//Midlewares 
app.use(morgan('dev')) //el dev es de la configuracion de desarrollo de morgan
app.use(express.urlencoded({extended:false}))//esto es para convertir lo que llegue en un arvhivo json
app.use(methodOverride('_method'))//_method quiere que esta esperando una consulta para reemplazar el metodo que venga desde un formulario por el metodo delete. _method es alparecer arbi, es como una variable que se igualara al metodo requerido
app.use(session({ //modulo para guardar mensajes en el cervidor
	secret: 'secret',  //configuracionde por default el modulo session
	rasave: true,
	saveUninitialized:true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()) //flash necita de session, con esto se agrega una funcion extra a los req que sera utilizada

//Global Variables
app.use((req,res,next)=>{
	res.locals.success_msg = req.flash('success_msg')//al ejecutar esto retornara el valor de success_msg que vendra de donde se halla inicializado
													//puede que halla mas de un success_msg, solo tomara el actual pq estos valores estaron dentro de funciones y pues estas se llamaran una a la vez
													//res.locals.success_msg  sera una variable en el cervidor
	res.locals.error_msg = req.flash('error_msg')
	res.locals.error = req.flash('error')
	res.locals.user = req.user || null
	next() //esto es para que ejecute lo siguiente, pq si no se pone queda clavado aqui alparecer
})

//Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/users.routes'))

//Static Files
app.use(express.static(path.join(__dirname,'public')))//alparecer esta linea es para hacer los archivos de public facilmente accesibles

module.exports = app