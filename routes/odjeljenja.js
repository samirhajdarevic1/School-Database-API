const { Router } = require('express');
const express = require('express');

const odjeljenjaController = require('../controllers/odjeljenja');
const uceniciController = require('../controllers/ucenici');
const nastavniciController = require('../controllers/nastavnici');

const router = express.Router();

//GET

router.get('/', odjeljenjaController.getOdjeljenja);

router.get('/:idOdjeljenja', odjeljenjaController.getOdjeljenje);

router.get('/:idOdjeljenja/ucenici', uceniciController.getUcenici);

router.get('/:idOdjeljenja/nastavnici', nastavniciController.getNastavnici);

//POST

router.post('/', odjeljenjaController.createOdjeljenje);

//DELETE

router.delete('/:idOdjeljenja', odjeljenjaController.deleteOdjeljenje);

//PUT

router.put('/:idOdjeljenja', odjeljenjaController.putUpdateOdjeljenje);
module.exports = router;
