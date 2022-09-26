const Odjeljenje = require('../models/odjeljenja');
const { errorResponse, successResponse } = require('./error');

exports.getOdjeljenja = async (req, res, next) => {
  try {
    const { idNastavnik } = req.params;
    let odjeljenja = [];
    if (idNastavnik) {
      odjeljenja = await Odjeljenje.fetchAll(idNastavnik);
    } else {
      odjeljenja = await Odjeljenje.fetchAll();
    }
    if (odjeljenja) {
      return res.json({ odjeljenja });
    }
    return [];
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.getOdjeljenje = async (req, res, next) => {
  try {
    const idOdjeljenja = req.params.idOdjeljenja;
    const odjeljenje = await Odjeljenje.findByPk(idOdjeljenja);
    if (odjeljenje) {
      return res.json({ odjeljenje });
    }
    return errorResponse(res, 'Nastavnik not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.createOdjeljenje = async (req, res, next) => {
  try {
    const { idSkolskaGodina, idNastavnikRazrednik, oznakaOdjeljenja, razred } =
      req.body;
    const odjeljenje = new Odjeljenje({
      idSkolskaGodina,
      idNastavnikRazrednik,
      oznakaOdjeljenja,
      razred,
    });
    await odjeljenje.save();
    return res.json({ message: 'Successfully created!' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.putUpdateOdjeljenje = async (req, res, next) => {
  try {
    const idOdjeljenja = req.params.idOdjeljenja;
    const { idSkolskaGodina, idNastavnikRazrednik, oznakaOdjeljenja, razred } =
      req.body;
    const odjeljenje = await Odjeljenje.findByPk(idOdjeljenja);
    if (!odjeljenje) {
      return errorResponse(res, 'Odjeljenje not found', 404);
    }
    odjeljenje.idSkolskaGodina = idSkolskaGodina;
    odjeljenje.idNastavnikRazrednik = idNastavnikRazrednik;
    odjeljenje.oznakaOdjeljenja = oznakaOdjeljenja;
    odjeljenje.razred = razred;
    await odjeljenje.save();
    return successResponse(res, 200, odjeljenje);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.deleteOdjeljenje = async (req, res, next) => {
  try {
    const idOdjeljenja = req.params.idOdjeljenja;
    const odjeljenje = await Odjeljenje.findByPk(idOdjeljenja);
    if (!odjeljenje) {
      return errorResponse(res, 'Odjeljenje not found', 404);
    }
    await odjeljenje.delete();
    return res.json({ message: 'Successfuly deleted' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
