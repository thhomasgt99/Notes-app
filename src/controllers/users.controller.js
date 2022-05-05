// const res = require("express/lib/response") //no se que es esto
const User =  require('../models/User') //modelo del user
const passport = require('passport')

const userCtrl = {}

userCtrl.rederSignUpForm = (req, res)=>{
	res.render('users/signup')
}

userCtrl.signup = async (req, res)=> { //auque toda la funcion se le declare async solo lo que tenga await sera asincrono alparecer
	const errors = []

	const {name, email, password, confirm_password} = req.body
	if(password != confirm_password){
		req.flash('error_msg')
		errors.push({text: 'La contraseña no coincide'}) 
	}
	if(password.length < 4 ) {
		errors.push({text: 'Las contraseñas deverian tener minimo 4 caracteres'})
	}
	if(errors.length > 0 ){
		res.render('users/signup', {errors,name,email,password, confirm_password}) //aqui validamos que si hay almenos un error pues renderizamos de nievo la vista de nuevo pero le ponemos los errores
	}else {
		const emailUser = await User.findOne({ email: email });  //User = modelo del user// findOne metodo de mongo para buscar, la forma en la que filtra es a travez de ese objeto
		if(emailUser){ //esta validacion es por si llegase a estar vasio el campo
			req.flash('error_msg', 'El correo ya esta en uso.')
			res.redirect('/users/signup')
		}else {
			const newUser = new User({name:name, email:email, password:password}) //creamos un nueco  users
			newUser.password = await newUser.encryptPassword(password) //esoto es para el cifrado, la funcion biene del modelo
			await newUser.save() //esto ya guarda en la base de datos 
			req.flash('success_msg', 'Estas registrado')
			res.redirect('/users/signin')
		}
	}  
}

userCtrl.rederSigninForm = (req, res)=>{
	res.render('users/signin')
}

userCtrl.signin = passport.authenticate('local',{ //local es un nombre y el objeto es par indicarle que hacer con la respuesta obtenida sea un error a un user
	successRedirect: '/notes',     //si es valido
	failureRedirect: '/users/signin', //si se equivoca en todo
	failureFlash: true             //si es un error
})//authenticate validara o utilizara sierta autenticacion que ya allamos definido antes,ose se vasara en el LocalStrategy delarchivo que esta en config

userCtrl.logout = (req, res)=>{
	req.logout()//esta  funcion es para eliminar atravez de session la sesion del servidor, nos sirve para cerrar la sesion
	req.flash('success_msg', 'Se ha cerrado tu sesion')
	res.redirect('/users/signin')
}
module.exports = userCtrl