const {Router} = require('express')
const router = Router()
const { 
	renderNotesForm,
	createNewNote,
	renderNotes,
	renderEditForm,
	updateNate,
	deletnote }=require('../controllers/notes.controller') //diferencia 1 el index

	const {isAuthenticated} = require('../helpers/auth')


//Nuevas notas
router.get('/notes/add',isAuthenticated, renderNotesForm) //isAuthenticated comprobara que este autenticado

router.post('/notes/new-note',isAuthenticated, createNewNote)

//obtener todas las notas
router.get('/notes', isAuthenticated, renderNotes)

//edit notes
router.get('/notes/edit/:id', isAuthenticated, renderEditForm)

router.put('/notes/edit/:id',isAuthenticated, updateNate)

//Delete Notes
router.delete('/notes/delete/:id', isAuthenticated, deletnote)

module.exports = router
