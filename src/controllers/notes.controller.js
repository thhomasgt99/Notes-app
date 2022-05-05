const notesCtrl = {}
const { assign } = require('express-handlebars/lib/utils')
const Note = require('../models/Note') //modelo de la nota

notesCtrl.renderNotesForm = (req , res)=> {
	res.render('notes/new-note')
}

//CUANDO UTILIZAMOS ASYNC ES ASINCRONISMO, OSE QUE TODAS ESAS FUNCIONES SON DE Y LAS VA A EJECUTAR LA BASE DE DATOS
//OSE QUE TODA LA SINTAX INTERNA DE ESTAS FUNCIONES NO ES TANTO DE JS SI NO DE MONGO Y DE LAS DIFERENTES DEPENDENCIAS

notesCtrl.createNewNote = async (req, res) => {
	const {title, description}= req.body //req.body es que cuando enviamos un formulario hacemos una peticion al cerbidor y los datos del cerver llegan en una parte de esa peticion llamada bady, podriamos imprimirlo por conlosa
	const newNote = new Note({title, description})
	newNote.user = req.user.id
	await newNote.save() //esto guardara el dato en mongo, gracias a mongoose y el modelo, la coleccion en mongo  tomara el monbre dado al modelo pero en prural
	req.flash('success_msg', 'Nota agregada')//viene del modulo flash que se instalodo, con esto le podemos dar un nombre al menjase arbi y un mensaje
	res.redirect('/notes')//una vez agregada redirecciona a la direccion dada
}

notesCtrl.renderNotes = async (req, res)=> {             //(createAtt: 'desc') es para ordenar la lista de manera descendente por fecha de creacion
	const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'}) //Note alparecer es el modelo de datos//alparecer es un array de objetos de la base de datos
	res.render('notes/all-notes',{notes}) //esto pasara las notas dentro de un objeto para utilizarlas dentro de lo que se va arenderizar
}

notesCtrl.renderEditForm = async (req, res)=> { 
	const note = await Note.findById(req.params.id)  //fundnes como findById()son de mongo
	if(note.user != req.user.id){
		req.flash('error_msg', 'No autorizado')
		return res.redirect('/notes')
	}
	res.render('notes/edit-note',{note: note})// recordar q {note: note} es igual a {note}
} 

notesCtrl.updateNate = async(req, res)=> {
	const {title, description} = req.body
	await Note.findByIdAndUpdate(req.params.id,{title, description}) //esto {title, description} es igual a {title:title, description:description}
	req.flash('success_msg', 'Nota actualizada satisfactoriamente') //repetimos el nombre success_msg pq asi podemos agrupar mensajes para darles estilos compartidos pero los mensajes internos seran distintos
	res.redirect('/notes')
}

notesCtrl.deletnote =async (req, res)=> {
	await Note.findByIdAndDelete(req.params.id ) //para borrar //fundnes como findByIdAndDelete()son de mongo
	req.flash('success_msg', 'Nota eliminada satisfactoriamente')
	res.redirect('/notes')//una vez borrado redirecciona a la direccion dada
}

module.exports = notesCtrl
