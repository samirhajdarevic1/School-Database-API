const Predmet = require('../models/predmeti');
const { errorResponse, successResponse } = require('./error');

exports.getPredmeti = async (req, res, next) => {
  try {
    const { idNastavnik } = req.params;
    let predmeti = [];
    if (idNastavnik) {
      predmeti = await Predmet.fetchAll(idNastavnik);
    } else {
      predmeti = await Predmet.fetchAll();
    }
    if (predmeti) {
      return res.json({ predmeti });
    }
    return [];
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.getPredmet = async (req, res, next) => {
  try {
    const idPredmet = req.params.idPredmet;
    const predmet = await Predmet.findByPk(idPredmet);
    if (predmet) {
      return res.json({ predmet });
    }
    return errorResponse(res, 'Predmet not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.createPredmet = async (req, res, next) => {
  try {
    const { naziv } = req.body;
    const predmet = new Predmet({ naziv });
    await predmet.save();
    return res.json({ message: 'Successfully created' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
exports.putUpdatePredmet = async (req, res, next) => {
  try {
    const idPredmet = req.params.idPredmet;
    const { naziv } = req.body;
    const predmet = await Predmet.findByPk(idPredmet);
    if (!predmet) {
      return errorResponse(res, 'Predmet not found', 404);
    }
    predmet.naziv = naziv;
    await predmet.save();
    return successResponse(res, 200, predmet);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.deletePredmet = async (req, res, next) => {
  try {
    const idPredmet = req.params.idPredmet;
    const predmet = await Predmet.findByPk(idPredmet);
    if (!predmet) {
      return errorResponse(res, 'Predmet not found', 404);
    }
    await predmet.delete();
    return res.json({ message: 'Successfuly deleted' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
