const {Schema, model} = require("mongoose")
//mongoose es una lobreria, TODA LA SIGUIENTE SINTAX ES PROPIA DE MONGOOSE
const NoteSchema = new Schema({
	title: {
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	user: {
		type:String,
		required: true,
	},
},{
	timestamps: true
})

module.exports = model('Note', NoteSchema) //Aqui ya tendriamos el model creado