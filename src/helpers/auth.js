const helpers = {}

helpers.isAuthenticated = (req , res, next)=>{
	if(req.isAuthenticated()){ //si esto es true significa que es usuario esta autenticado, isAuthenticated() biene de passport y sirve apra verificar si existe lasecin del usuario o no
		return next()
	}
	req.flash('error_msg', 'Not Authorized')
	res.redirect('/users/signin') //si no esta autentido le redirecciona al login
}

module.exports = helpers