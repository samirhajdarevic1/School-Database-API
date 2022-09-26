const db = require('../util/database');

module.exports = class OdjeljenjeNastavnik {
  constructor({
    idOdjeljenjeNastavnik,
    idOdjeljenja,
    idNastavnik,
    idSkolskaGodina,
  }) {
    this.idOdjeljenjeNastavnik = idOdjeljenjeNastavnik;
    this.idOdjeljenja = idOdjeljenja;
    this.idNastavnik = idNastavnik;
    this.idSkolskaGodina = idSkolskaGodina;
  }

  async save() {
    if (!this.idOdjeljenjeNastavnik) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const savedOdjNast = await db.execute(
      'INSERT INTO odjeljenja_nastavnici (id_odjeljenja, id_nastavnik, id_skolska_godina) VALUES (?, ?, ?)',
      [this.idOdjeljenja, this.idNastavnik]
    );
    this.idOdjeljenjeNastavnik = savedOdjNast[0].insertId;
  }

  async update() {
    const updatedOdjNast = await db.execute(
      'UPDATE odjeljenja_nastavnici SET id_odjeljenja = ?, id_nastavnik = ?, id_skolska_godina WHERE id_odjeljenje_nastavnik = ?',
      [
        this.idOdjeljenja,
        this.idNastavnik,
        this.idSkolskaGodina,
        this.idOdjeljenjeNastavnik,
      ]
    );
  }

  static async fetchAll(idOdjelj, idNast, idSkolGod) {
    let query = 'SELECT * FROM odjeljenja_nastavnici';
    if (idOdjelj) {
      query += ` where id_odjeljenja = ${idOdjelj}`;
    }
    if (idNast) {
      query += ` OR id_odjeljenja = ${idNast}`;
    }
    if (idSkolGod) {
      query += ` OR id_odjeljenja = ${idSkolGod}`;
    }
    const odjeljNast = await db.execute(query);
    const odjNastInstances = odjeljNast[0].map((odjNast) => {
      return new OdjeljenjeNastavnik({
        idOdjeljenjeNastavnik: odjNast.id_odjeljenje_nastavnik,
        idOdjeljenja: odjNast.id_odjeljenja,
        idNastavnik: odjNast.id_nastavnik,
        idSkolskaGodina: odjNast.id_skolska_godina,
      });
    });
    return odjNastInstances;
  }

  static async findByPk(id) {
    const odjeljenjeNastavnik = await db.execute(
      'SELECT * FROM odjeljenja_nastavnici WHERE odjeljenja_nastavnici.id_odjeljenje_nastavnik = ? LIMIT 1',
      [id]
    );
    if (odjeljenjeNastavnik[0].length === 0) {
      return null;
    }
    const {
      id_odjeljenje_nastavnik,
      id_odjeljenja,
      id_nastavnik,
      id_skolska_godina,
    } = odjeljenjeNastavnik[0][0];
    return new OdjeljenjeNastavnik({
      idOdjeljenjeNastavnik: id_odjeljenje_nastavnik,
      idOdjeljenja: id_odjeljenja,
      idNastavnik: id_nastavnik,
      idSkolskaGodina: id_skolska_godina,
    });
  }

  async delete() {
    if (this.idOdjeljenjeNastavnik === null) {
      throw new Error(
        "Missing idOdjeljenjeNastavnik value. Delete can't be executed!"
      );
    }
    const odjNast = await db.execute(
      'DELETE FROM odjeljenja_nastavnici WHERE id_odjeljenje_nastavnik = ?',
      [this.idOdjeljenjeNastavnik]
    );
    return odjPredNast[0];
  }
};
