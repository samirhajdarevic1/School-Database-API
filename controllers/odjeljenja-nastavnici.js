const OdjeljenjeNastavnik = require('../models/odjeljenja-nastavnici');
const { errorResponse, successResponse } = require('./error');

exports.getOdjeljenjaNastavnici = async (req, res, next) => {
  try {
    const { idOdjeljenja, idNastavnik, idSkolskaGodina } = req.query;
    const odjeljenjaNastavnici = await OdjeljenjeNastavnik.fetchAll(
      idOdjeljenja,
      idNastavnik,
      idSkolskaGodina
    );
    if (odjeljenjaNastavnici) {
      return res.json({ odjeljenjaNastavnici });
    }
    return errorResponse(res, 'Nastavnici not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.getOdjeljenjeNastavnik = async (req, res, next) => {
  try {
    const idOdjPredNast = req.params.idOdjPredNast;
    const odjeljenjeNastavnik = await OdjeljenjeNastavnik.findByPk(
      idOdjPredNast
    );
    if (odjeljenjeNastavnik) {
      return res.json({ odjeljenjeNastavnik });
    }
    return errorResponse(res, 'Odjeljenje  nastavnik not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.createOdjeljenjeNastavnik = async (req, res, next) => {
  try {
    const { idOdjeljenja, idNastavnik } = req.body;
    const odjPredNast = new OdjeljenjeNastavnik({
      idOdjeljenja,
      idNastavnik,
    });
    console.log(odjPredNast);
    await odjPredNast.save();
    return res.json({ message: 'Successfully created!' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.updateOdjeljenjeNastavnik = async (req, res, next) => {
  try {
    const idOdjPredNast = req.params.idOdjPredNast;
    const { idOdjeljenja, idNastavnik } = req.body;
    const odjPredNast = await OdjeljenjeNastavnik.findByPk(idOdjPredNast);
    if (!odjPredNast) {
      return errorResponse(res, 'Odjeljenje  nastavnik not found', 404);
    }
    odjPredNast.idOdjeljenja = idOdjeljenja;
    odjPredNast.idNastavnik = idNastavnik;
    await odjPredNast.save();
    return successResponse(res, 200, odjPredNast);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.deleteOdjeljenjeNastavnik = async (req, res, next) => {
  try {
    const idOdjPredNast = req.params.idOdjPredNast;
    const odjeljenjeNastavnik = await OdjeljenjeNastavnik.findByPk(
      idOdjPredNast
    );
    if (!odjeljenjeNastavnik) {
      return errorResponse(res, 'Odjeljenje  nastavnk not found', 404);
    }
    await odjeljenjeNastavnik.delete();
    return res.json({ message: 'Successfuly deleted' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
