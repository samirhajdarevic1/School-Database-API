const SkolskaGodina = require('../models/skolske-godine');
const { errorResponse, successResponse } = require('./error');

exports.getSkolskeGodine = async (req, res, next) => {
  try {
    const skolskeGodine = await SkolskaGodina.fetchAll();
    if (skolskeGodine) {
      return res.json({ skolskeGodine });
    }
    return errorResponse(res, 'Skolske godine not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.getSkolskaGodina = async (req, res, next) => {
  try {
    const idSkolskaGodina = req.params.idSkolskaGodina;
    const skolskaGodina = await SkolskaGodina.findByPk(idSkolskaGodina);
    if (skolskaGodina) {
      return res.json({ skolskaGodina });
    }
    return errorResponse(res, 'Nastavnik not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.createSkolskaGodina = async (req, res, next) => {
  try {
    const { skolskaGodina } = req.body;
    const createdSkolskaGodina = new SkolskaGodina({ skolskaGodina });
    await createdSkolskaGodina.save();
    return successResponse(res, 200, createdSkolskaGodina);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.putUpdateSkolskaGodina = async (req, res, next) => {
  try {
    const idSkolskaGodina = req.params.idSkolskaGodina;
    const { skolskaGodina } = req.body;
    const skolskaGod = await SkolskaGodina.findByPk(idSkolskaGodina);
    if (!skolskaGod) {
      return errorResponse(res, 'Nastavnik not found', 404);
    }
    skolskaGod.skolskaGodina = skolskaGodina;
    await skolskaGod.save();
    return successResponse(res, 200, skolskaGod);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.deleteSkolskaGodina = async (req, res, next) => {
  try {
    const idSkolskaGodina = req.params.idSkolskaGodina;
    const skolskaGodina = await SkolskaGodina.findByPk(idSkolskaGodina);
    if (!skolskaGodina) {
      return errorResponse(res, 'Nastavnik not found', 404);
    }
    await skolskaGodina.delete();
    return res.json({ message: 'Successfuly deleted' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
