const db = require('../util/database');

module.exports = class PredmetNastavnik {
  constructor({ idPredmetNastavnik, idPredmet, idNastavnik, idSkolskaGodina }) {
    this.idPredmetNastavnik = idPredmetNastavnik;
    this.idPredmet = idPredmet;
    this.idNastavnik = idNastavnik;
    this.idSkolskaGodina = idSkolskaGodina;
  }

  async save() {
    if (!this.idPredmetNastavnik) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const insertedPredmetNastavnik = await db.execute(
      'INSERT INTO predmeti_nastavnici (id_predmet, id_nastavnik, id_skolska_godina) VALUES (?, ?, ?)',
      [this.idPredmet, this.idNastavnik, this.idSkolskaGodina]
    );
    this.idPredmetNastavnik = insertedPredmetNastavnik[0].insertId;
  }

  async update() {
    const updatedPredmetNastavnik = await db.execute(
      'UPDATE predmeti_nastavnici SET id_predmet = ?, id_nastavnik = ?, id_skolska_godina = ? WHERE id_predmet_nastavnik = ?',
      [
        this.idPredmet,
        this.idNastavnik,
        this.idSkolskaGodina,
        this.idPredmetNastavnik,
      ]
    );
  }

  static async fetchAll() {
    const predmetiNastavnici = await db.execute(
      'SELECT * FROM predmeti_nastavnici'
    );

    const predmetiNastavniciInstances = predmetiNastavnici[0].map(
      (predNast) => {
        return new PredmetNastavnik({
          idPredmetNastavnik: predNast.id_predmet_nastavnik,
          idPredmet: predNast.id_predmet,
          idNastavnik: predNast.id_nastavnik,
          idSkolskaGodina: predNast.id_skolska_godina,
        });
      }
    );
    return predmetiNastavniciInstances;
  }

  static async findByPk(id) {
    const predNast = await db.execute(
      'SELECT * FROM predmeti_nastavnici WHERE predmeti_nastavnici.id_predmet_nastavnik = ? LIMIT 1',
      [id]
    );
    if (predNast[0].length === 0) {
      return null;
    }
    const {
      id_predmet_nastavnik,
      id_predmet,
      id_nastavnik,
      id_skolska_godina,
    } = predNast[0][0];
    return new PredmetNastavnik({
      idPredmetNastavnik: id_predmet_nastavnik,
      idPredmet: id_predmet,
      idNastavnik: id_nastavnik,
      idSkolskaGodina: id_skolska_godina,
    });
  }

  async delete() {
    if (this.idPredmetNastavnik === null) {
      throw new Error("Missing idOdjeljenja value. Delete can't be executed!");
    }
    const deletedPredmetNastavnik = await db.execute(
      'DELETE FROM predmeti_nastavnici WHERE id_predmet_nastavnik = ?',
      [this.idPredmetNastavnik]
    );
    return deletedPredmetNastavnik[0];
  }
};
