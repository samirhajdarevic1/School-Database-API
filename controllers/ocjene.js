const Ocjena = require('../models/ocjene');
const { errorResponse, successResponse } = require('./error');

exports.getOcjene = async (req, res, next) => {
  try {
    const { idUcenik } = req.params;
    const { idOdjeljenja } = req.query;

    if (idOdjeljenja & idUcenik) {
      const ocjene = await Ocjena.fetchAll(idOdjeljenja, idUcenik);
      if (ocjene.length > 0) {
        return res.json({ ocjene });
      }
    }
    if (idUcenik) {
      const ocjene = await Ocjena.fetchAll(idUcenik);
      if (ocjene.length > 0) {
        return res.json({ ocjene });
      }
    }
    const ocjene = await Ocjena.fetchAll();
    if (ocjene.length > 0) {
      return res.json({ ocjene });
    }
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.getOcjena = async (req, res, next) => {
  try {
    const idOcjena = req.params.idOcjena;
    const ocjena = await Ocjena.findByPk(idOcjena);
    if (ocjena) {
      return res.json({ ocjena });
    }
    return errorResponse(res, 'Ocjena not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.createOcjena = async (req, res, next) => {
  try {
    const {
      idOdjeljenja,
      idUcenik,
      idNastavnik,
      idPredmet,
      datum,
      ocjena,
      opis,
    } = req.body;
    const ocj = new Ocjena({
      idOdjeljenja,
      idUcenik,
      idNastavnik,
      idPredmet,
      datum,
      ocjena,
      opis,
    });
    await ocj.save();
    return successResponse(res, 200, ocj);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.putUpdateOcjena = async (req, res, next) => {
  try {
    const idOcjena = req.params.idOcjena;
    const {
      idOdjeljenja,
      idUcenik,
      idNastavnik,
      idPredmet,
      datum,
      ocjena,
      opis,
    } = req.body;
    const ocj = await Ocjena.findByPk(idOcjena);
    if (!ocj) {
      return errorResponse(res, 'Ocjena not found', 404);
    }
    ocj.idOdjeljenja = idOdjeljenja;
    ocj.idUcenik = idUcenik;
    ocj.idNastavnik = idNastavnik;
    ocj.idPredmet = idPredmet;
    ocj.datum = datum;
    ocj.ocjena = ocjena;
    ocj.opis = opis;
    await ocj.save();
    return successResponse(res, 200, ocj);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.deleteOcjena = async (req, res, next) => {
  try {
    const idOcjena = req.params.idOcjena;
    const ocj = await Ocjena.findByPk(idOcjena);
    if (!ocj) {
      return errorResponse(res, 'Ocjena not found', 404);
    }
    await ocj.delete();
    return res.json({ message: 'Successfuly deleted' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
