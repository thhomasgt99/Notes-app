// const { hash } = require('bcryptjs')
const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')
//mongoose es una lobreria, TODA LA SIGUIENTE SINTAX ES PROPIA DE MONGOOSE
const UserSchema = new Schema({
	name: {
		type: String,
		required:true
	},
	email: {
		type: String,
		required:true,
		unique: true  //esto es para que arroje un error ya existe este correo en la base de datos al momento de ingresar un nuevo user, aunque en este caso vamos a validar esto con logica, pero aqui lo dejo
	},
	password: {      //ESTE CAMPO LO VAMOS A CIFRAR
		type: String,
		required:true
	}
},{
	timestamps:true,
})

UserSchema.methods.encryptPassword = async (password)=> {  //methods es de mongoose para agragar metodos a la clase creada
	const salt =  await bcrypt.genSalt(10)//esto en un string o numero que genera bcrypt para el incryptado
  return await	bcrypt.hash(password,salt)
} 

UserSchema.methods.matchPassword = async function(password){ //esta es para comparar la contraseña cifrada de la base de datos con la que llega del user, retorna un bolean
	return await bcrypt.compare(password,this.password)	//la razon pq pusimos la funcion no flecha es por el escope para utilizar .this,alparecer ()=>{} su scope no le permite entrar a la clase
}																								//muy probablemente UserSchema.methods crea estos metodos en la clase, por eso es que la funcion puede acceder con this

module.exports = model('User', UserSchema) //Aqui ya tendriamos el model creado

