const { Router } = require('express');
const express = require('express');

const uceniciController = require('../controllers/ucenici');
const ocjeneController = require('../controllers/ocjene');

const router = express.Router();

//GET /ucenici

router.get('/', uceniciController.getUcenici);

router.get('/:idUcenik', uceniciController.getUcenik);

router.get('/:idUcenik/ocjene', ocjeneController.getOcjene);

//POST /ucenik
router.post('/', uceniciController.createUcenik);

//DELETE
router.delete('/:idUcenik', uceniciController.deleteUcenik);

//PUT
router.put('/:idUcenik', uceniciController.putUpdateUcenik);

module.exports = router;
