const { Router } = require('express');
const express = require('express');

const nastavniciController = require('../controllers/nastavnici');
const predmetiController = require('../controllers/predmeti');
const odjeljenjaController = require('../controllers/odjeljenja');
const { route } = require('./odjeljenja-nastavnici');

const router = express.Router();

//GET /nastavnici

router.get('/', nastavniciController.getNastavnici);

router.get('/:idNastavnik', nastavniciController.getNastavnik);

router.get('/:idNastavnik/predmeti', predmetiController.getPredmeti);

router.get('/:idNastavnik/odjeljenja', odjeljenjaController.getOdjeljenja);

//POST /nastavnik
router.post('/', nastavniciController.createNastavnik);

// PUT
router.put('/:idNastavnik', nastavniciController.putUpdateNastavnik);

//DELETE
router.delete('/:idNastavnik', nastavniciController.deleteNastavnik);

module.exports = router;
