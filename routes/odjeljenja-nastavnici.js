const { Router } = require('express');
const express = require('express');

const odjNasController = require('../controllers/odjeljenja-nastavnici');

const router = express.Router();

//GET

router.get('/', odjNasController.getOdjeljenjaNastavnici);

router.get('/:idOdjdNast', odjNasController.getOdjeljenjeNastavnik);
//POST

router.post('/', odjNasController.createOdjeljenjeNastavnik);

//PUT

router.put('/:idOdjdNast', odjNasController.updateOdjeljenjeNastavnik);

//DELETE
router.delete('/:idOdjdNast', odjNasController.deleteOdjeljenjeNastavnik);

module.exports = router;
