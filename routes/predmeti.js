const { Router } = require('express');
const express = require('express');

const predmetiController = require('../controllers/predmeti');
const nastavniciController = require('../controllers/nastavnici');

const router = express.Router();

//GET

router.get('/', predmetiController.getPredmeti);

router.get('/:idPredmet', predmetiController.getPredmet);

router.get('/:idPredmet/nastavnici', nastavniciController.getNastavnici);

//POST

router.post('/', predmetiController.createPredmet);

//UPDATE

router.put('/:idPredmet', predmetiController.putUpdatePredmet);

//DELETE

router.delete('/:idPredmet', predmetiController.deletePredmet);

module.exports = router;
