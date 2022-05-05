const {Router}= require('express')
const router = Router()

const {
	rederSignUpForm,
	signup,
	rederSigninForm,
	signin,
	logout
}=require('../controllers/users.controller')

router.get('/users/signup', rederSignUpForm)
router.post('/users/signup', signup)

router.get('/users/signin', rederSigninForm)
router.post('/users/signin', signin)

router.get('/users/logout', logout)


module.exports = router