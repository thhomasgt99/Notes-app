const indexCtrl = {}

indexCtrl.renderIndex = (req , res)=> {  //parese que así nomas agregamos una propiedad en este caso renderIndex, a el objeto
	res.render('index')
}

indexCtrl.renderAbout = (req, res) => {
	res.render('about')
}

module.exports = indexCtrl