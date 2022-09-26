const db = require('../util/database');

module.exports = class Predmet {
  constructor({ idPredmet, naziv }) {
    this.idPredmet = idPredmet;
    this.naziv = naziv;
  }

  async save() {
    if (!this.idPredmet) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const insertedPredmet = await db.execute(
      'INSERT INTO predmeti (naziv) VALUES (?)',
      [this.naziv]
    );
    this.idPredmet = insertedPredmet[0].insertId;
  }

  async update() {
    const updatedPredmet = await db.execute(
      'UPDATE predmeti SET naziv = ? WHERE id_predmet = ?',
      [this.naziv, this.idPredmet]
    );
  }
  static async fetchAll(idNastavnik) {
    console.log(idNastavnik);
    if (idNastavnik) {
      const predmeti = await db.execute(
        `SELECT p.naziv FROM balkon.predmeti_nastavnici pn JOIN balkon.predmeti p JOIN balkon.nastavnici n 
        WHERE pn.id_predmet = p.id_predmet 
        AND pn.id_nastavnik = n.id_nastavnik 
        AND n.id_nastavnik = ${idNastavnik};`
      );
      const predmetiInstances = predmeti[0].map((predmet) => {
        return new Predmet({
          idPredmet: predmet.id_predmet,
          naziv: predmet.naziv,
        });
      });
      return predmetiInstances;
    } else {
      const predmeti = await db.execute('SELECT * FROM predmeti');
      const predmetiInstances = predmeti[0].map((predmet) => {
        return new Predmet({
          idPredmet: predmet.id_predmet,
          naziv: predmet.naziv,
        });
      });
      return predmetiInstances;
    }
  }

  static async fetchByNastavnik(idNastavnik) {
    const predmeti = await db.execute('SELECT * FROM predmeti');
    const predmetiInstances = predmeti[0].map((predmet) => {
      return new Predmet({
        idPredmet: predmet.id_predmet,
        naziv: predmet.naziv,
      });
    });
    return predmetiInstances;
  }

  static async findByPk(id) {
    const predmet = await db.execute(
      'SELECT * FROM predmeti WHERE predmeti.id_predmet = ?',
      [id]
    );
    if (predmet[0].length === 0) {
      return null;
    }
    const { id_predmet, naziv } = predmet[0][0];
    return new Predmet({ idPredmet: id_predmet, naziv: naziv });
  }

  async delete() {
    if (this.idPredmet === null) {
      throw new Error("Missing idPredmet value. Delete can't be executed!");
    }
    const deletedPredmet = await db.execute(
      'DELETE FROM predmeti WHERE id_predmet= ?',
      [this.idPredmet]
    );
    return deletedPredmet[0];
  }
};
