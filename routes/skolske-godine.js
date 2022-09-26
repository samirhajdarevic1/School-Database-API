const { Router } = require('express');
const express = require('express');

const skolskeGodineController = require('../controllers/skolske-godine');

const router = express.Router();

//GET /skolske godine

router.get('/', skolskeGodineController.getSkolskeGodine);

router.get('/:idSkolskaGodina', skolskeGodineController.getSkolskaGodina);

//POST /skolska godina
router.post('/', skolskeGodineController.createSkolskaGodina);

//DELETE
router.delete('/:idSkolskaGodina', skolskeGodineController.deleteSkolskaGodina);

//PUT
router.put('/:idSkolskaGodina', skolskeGodineController.putUpdateSkolskaGodina);

module.exports = router;
