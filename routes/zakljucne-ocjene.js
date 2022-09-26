const { Router } = require('express');
const express = require('express');

const zakljucneOcjeneController = require('../controllers/zakljucne-ocjene');

const router = express.Router();

//GET

router.get('/', zakljucneOcjeneController.getZakljucneOcjene);

router.get('/:idZakljucnaOcjena', zakljucneOcjeneController.getZakljucnaOcjena);

//POST /ucenik
router.post('/', zakljucneOcjeneController.createZakljucnaOcjena);

//PUT
router.put(
  '/:idZakljucnaOcjena',
  zakljucneOcjeneController.putUpdateZakljucnaOcjena
);
//DELETE
router.delete(
  '/:idZakljucnaOcjena',
  zakljucneOcjeneController.deleteZakljucnaOcjena
);

module.exports = router;
