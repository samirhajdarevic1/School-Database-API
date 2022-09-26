const ZakljucnaOcjena = require('../models/zakljucne-ocjene');
const { errorResponse, successResponse } = require('./error');

exports.getZakljucneOcjene = async (req, res, next) => {
  try {
    const zakljucneOcjene = await ZakljucnaOcjena.fetchAll();
    console.log(zakljucneOcjene);
    if (zakljucneOcjene) {
      return res.json({ zakljucneOcjene });
    }
    return errorResponse(res, 'Nastavnici not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.getZakljucnaOcjena = async (req, res, next) => {
  try {
    const idZakljucnaOcjena = req.params.idZakljucnaOcjena;
    const zakljucnaOcjena = await ZakljucnaOcjena.findByPk(idZakljucnaOcjena);
    if (zakljucnaOcjena) {
      return res.json({ zakljucnaOcjena });
    }
    return errorResponse(res, 'Zakljucna ocjena not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.createZakljucnaOcjena = async (req, res, next) => {
  try {
    const { idSkolskaGodina, idPredmet, idUcenik, zakljucnaOcjena } = req.body;
    const zakljucnaOcj = new ZakljucnaOcjena({
      idSkolskaGodina,
      idPredmet,
      idUcenik,
      zakljucnaOcjena,
    });
    await zakljucnaOcj.save();
    return successResponse(res, 200, zakljucnaOcj);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.putUpdateZakljucnaOcjena = async (req, res, next) => {
  try {
    const idZakljucnaOcjena = req.params.idZakljucnaOcjena;
    const { idSkolskaGodina, idPredmet, idUcenik, zakljucnaOcjena } = req.body;
    const zakljucnaOcj = await ZakljucnaOcjena.findByPk(idZakljucnaOcjena);
    if (!zakljucnaOcj) {
      return errorResponse(res, 'Nastavnik not found', 404);
    }
    zakljucnaOcj.idSkolskaGodina = idSkolskaGodina;
    zakljucnaOcj.idPredmet = idPredmet;
    zakljucnaOcj.idUcenik = idUcenik;
    zakljucnaOcj.zakljucnaOcjena = zakljucnaOcjena;
    await zakljucnaOcj.save();
    return successResponse(res, 200, zakljucnaOcj);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.deleteZakljucnaOcjena = async (req, res, next) => {
  try {
    const idZakljucnaOcjena = req.params.idZakljucnaOcjena;
    const zakljucnaOcjena = await ZakljucnaOcjena.findByPk(idZakljucnaOcjena);
    if (!zakljucnaOcjena) {
      return errorResponse(res, 'Nastavnik not found', 404);
    }
    await zakljucnaOcjena.delete();
    return res.json({ message: 'Successfuly deleted' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
