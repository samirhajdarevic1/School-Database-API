const express = require('express');

const ocjeneController = require('../controllers/ocjene');

const router = express.Router();

//GET
router.get('/', ocjeneController.getOcjene);

router.get('/:idOcjena', ocjeneController.getOcjena);

//POST
router.post('/', ocjeneController.createOcjena);

//PUT
router.put('/:idOcjena', ocjeneController.putUpdateOcjena);

//DELETE
router.delete('/:idOcjena', ocjeneController.deleteOcjena);

module.exports = router;
