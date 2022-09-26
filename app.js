const express = require('express');
const db = require('./util/database');

const uceniciRoutes = require('./routes/ucenici');
const skolskeGodineRoutes = require('./routes/skolske-godine');
const nastavniciRoutes = require('./routes/nastavnici');
const predmetiRoutes = require('./routes/predmeti');
const odjeljenjaRoutes = require('./routes/odjeljenja');
const predmetiNastavniciRoutes = require('./routes/predmeti-nastavnici');
const ocjeneRoutes = require('./routes/ocjene');
const zakljucneOcjeneRoutes = require('./routes/zakljucne-ocjene');
const odjNastRoutes = require('./routes/odjeljenja-nastavnici');

const app = express();
app.use(express.json()); //application/json

//app.use(bodyParser.urlencoded()); // kad imamo forntend tj.kad formu koristimo

const errorController = require('./controllers/error');

app.use((req, res, next) => {
  res.setHeader('Acces-Control-Allow-Origin', '*'); //allowes acces from any client
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE'); //allowes speciffic  origin to use speciffic http methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorisation'); //client can send request that holds extra authorisation data in the header and content-type of request
  next();
});

app.use('/ucenici', uceniciRoutes);
app.use('/skolske-godine', skolskeGodineRoutes);
app.use('/nastavnici', nastavniciRoutes);
app.use('/predmeti', predmetiRoutes);
app.use('/odjeljenja', odjeljenjaRoutes);
app.use('/predmeti-nastavnici', predmetiNastavniciRoutes);
app.use('/ocjene', ocjeneRoutes);
app.use('/zakljucne-ocjene', zakljucneOcjeneRoutes);
app.use('/odjeljenja-nastavnici', odjNastRoutes);
app.use(errorController.get404);

app.listen(3000);
