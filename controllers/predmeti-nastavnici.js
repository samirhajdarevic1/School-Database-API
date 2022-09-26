const PredmetNastavnik = require('../models/predmeti-nastavnici');
const { errorResponse, successResponse } = require('./error');

exports.getPredmetiNastavnici = async (req, res, next) => {
  try {
    const predmetiNastavnici = await PredmetNastavnik.fetchAll();
    if (predmetiNastavnici) {
      return res.json({ predmetiNastavnici });
    }
    return errorResponse(res, 'Nastavnici not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.getPredmetNastavnik = async (req, res, next) => {
  try {
    const idPredmetNastavnik = req.params.idPredmetNastavnik;
    const predmetNastavnik = await PredmetNastavnik.findByPk(
      idPredmetNastavnik
    );
    if (predmetNastavnik) {
      return res.json({ predmetNastavnik });
    }
    return errorResponse(res, 'Predmet-nastavnik not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.createPredmetNastavnik = async (req, res, next) => {
  try {
    const { idPredmet, idNastavnik, idSkolskaGodina } = req.body;
    const predmetNastavnik = new PredmetNastavnik({
      idPredmet,
      idNastavnik,
      idSkolskaGodina,
    });
    await predmetNastavnik.save();
    return successResponse(res, 200, predmetNastavnik);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.putUpdatePredmetNastavnik = async (req, res, next) => {
  try {
    const idPredmetNastavnik = req.params.idPredmetNastavnik;
    const { idPredmet, idNastavnik, idSkolskaGodina } = req.body;
    const predmetNastavnik = await PredmetNastavnik.findByPk(
      idPredmetNastavnik
    );
    if (!predmetNastavnik) {
      return errorResponse(res, 'Nastavnik not found', 404);
    }
    predmetNastavnik.idPredmet = idPredmet;
    predmetNastavnik.idNastavnik = idNastavnik;
    predmetNastavnik.idSkolskaGodina = idSkolskaGodina;

    await predmetNastavnik.save();
    return successResponse(res, 200, predmetNastavnik);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.deletePredmetNastavnik = async (req, res, next) => {
  try {
    const idPredmetNastavnik = req.params.idPredmetNastavnik;
    const predmetNastavnik = await PredmetNastavnik.findByPk(
      idPredmetNastavnik
    );
    if (!predmetNastavnik) {
      return errorResponse(res, 'Predmet-nastavnik not found', 404);
    }
    await predmetNastavnik.delete();
    return res.json({ message: 'Successfuly deleted' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
