const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')


passport.use(new LocalStrategy({ //aqui utilizamos passport para hacer algo como 'una nueva estrategia de autenticacion'
	usernameField: 'email',            //aqui van los parametros de que datos voy a recibir
	passwordField: 'password'         // email y password es porque le llegan de los input y los inputs tienen esos nombre en su valor name
}, async(email, password, done)=>{   //esta funcion va a tratar de tomar esos datos y pues hacer algo con ellos//done es un callback
	const user = await User.findOne({email}) //bucamos el correo
	if(!user){             
		return done(null, false, { message: 'El usuario no existe'}) //done utiliza 3 valires, un valor de error en este caso null, la existencia de un usuario y unas opciones que es este caso meteremos el error ahí
	}else {
		const match =  await user.matchPassword(password) //esto compara la clave que le llega con la clava de la base de datos
		if(match){//match tendria un true alparecer
			return done(null, user,)
		}else {
			return done(null, false, {message: 'Clave incorrecta'})
		}
	}
}))

//ALPARECER ESTAS FUNCIONES SIGUIENTES SON PARA QUE NO SE METAN ATRAVEZ DE LA URL
passport.serializeUser((user, done)=>{ 	//serializeUser es para guardar el usuario
	done(null, user.id)										//cuando el user sea registrado sera guardado en la sesion del servidor
})

//cuando el user ya este registrado passport hara una consulta a la base de datos para saver si ese id tiene autorizacion
passport.deserializeUser((id, done)=>{ //deserializara en usuario
	User.findById(id,(err, user)=>{ //comprobaremos en base al id si el usurio que esta navegando tiene los permisos para estar en casa pestaña
		done(err, user) // esto mandara el usuario si existe o si no un erro 
	})
})


