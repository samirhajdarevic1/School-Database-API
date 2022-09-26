const Nastavnik = require('../models/nastavnici');
const { errorResponse, successResponse } = require('./error');

exports.getNastavnici = async (req, res, next) => {
  try {
    const { idOdjeljenja, idPredmet } = req.params;

    if (idPredmet) {
      const nastavnici = await Nastavnik.fetchAll(idOdjeljenja, idPredmet);
      if (nastavnici) {
        return res.json({ nastavnici });
      }
    }

    if (idOdjeljenja) {
      const nastavnici = await Nastavnik.fetchAll(idOdjeljenja, idPredmet);
      if (nastavnici) {
        return res.json({ nastavnici });
      }
    }

    const nastavnici = await Nastavnik.fetchAll();
    if (nastavnici) {
      return res.json({ nastavnici });
    }
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.getNastavnik = async (req, res, next) => {
  try {
    const idNastavnik = req.params.idNastavnik;
    const nastavnik = await Nastavnik.findByPk(idNastavnik);
    if (nastavnik) {
      return res.json({ nastavnik });
    }
    return errorResponse(res, 'Nastavnik not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.createNastavnik = async (req, res, next) => {
  try {
    let { ime, prezime } = req.body;
    ime = ime.trim();
    prezime = prezime.trim();
    if (ime || prezime === '') {
      errorResponse(res, 'Must enter the value');
      return;
    }
    const nastavnik = new Nastavnik({ ime, prezime });
    await nastavnik.save();
    return successResponse(res, 200, nastavnik);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.putUpdateNastavnik = async (req, res, next) => {
  try {
    const idNastavnik = req.params.idNastavnik;
    const { ime, prezime } = req.body;
    const nastavnik = await Nastavnik.findByPk(idNastavnik);
    if (!nastavnik) {
      return errorResponse(res, 'Nastavnik not found', 404);
    }
    nastavnik.ime = ime;
    nastavnik.prezime = prezime;
    await nastavnik.save();
    return successResponse(res, 200, nastavnik);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.deleteNastavnik = async (req, res, next) => {
  try {
    const idNastavnik = req.params.idNastavnik;
    const nastavnik = await Nastavnik.findByPk(idNastavnik);
    if (!nastavnik) {
      return errorResponse(res, 'Nastavnik not found', 404);
    }
    await nastavnik.delete();
    return res.json({ message: 'Successfuly deleted' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
