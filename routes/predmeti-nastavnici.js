const { Router } = require('express');
const express = require('express');

const predmetiNastavniciController = require('../controllers/predmeti-nastavnici');

const router = express.Router();

//GET /predmeti-nastavnici

router.get('/', predmetiNastavniciController.getPredmetiNastavnici);
router.get(
  '/:idPredmetNastavnik',
  predmetiNastavniciController.getPredmetNastavnik
);

//POST /predmet nastavnik
router.post('/', predmetiNastavniciController.createPredmetNastavnik);

//PUT
router.put(
  '/:idPredmetNastavnik',
  predmetiNastavniciController.putUpdatePredmetNastavnik
);

//DELETE
router.delete(
  '/:idPredmetNastavnik',
  predmetiNastavniciController.deletePredmetNastavnik
);

module.exports = router;
