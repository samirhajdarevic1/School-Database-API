const db = require('../util/database');

module.exports = class Odjeljenje {
  constructor({
    idOdjeljenja,
    idSkolskaGodina,
    idNastavnikRazrednik,
    oznakaOdjeljenja,
    razred,
  }) {
    this.idOdjeljenja = idOdjeljenja;
    this.idSkolskaGodina = idSkolskaGodina;
    this.idNastavnikRazrednik = idNastavnikRazrednik;
    this.oznakaOdjeljenja = oznakaOdjeljenja;
    this.razred = razred;
  }

  async save() {
    if (!this.idOdjeljenja) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const insertedOdjeljenje = await db.execute(
      'INSERT INTO odjeljenja (id_skolska_godina, id_nastavnik_razrednik, oznaka_odjeljenja, razred) VALUES (?, ?, ?, ?)',
      [
        this.idSkolskaGodina,
        this.idNastavnikRazrednik,
        this.oznakaOdjeljenja,
        this.razred,
      ]
    );
    this.idOdjeljenje = insertedOdjeljenje[0].insertId;
  }

  async update() {
    const updatedOdjeljenje = await db.execute(
      'UPDATE odjeljenja SET id_skolska_godina = ?, id_nastavnik_razrednik = ?, oznaka_odjeljenja = ?, razred = ? WHERE id_odjeljenja = ?',
      [
        this.idSkolskaGodina,
        this.idNastavnikRazrednik,
        this.oznakaOdjeljenja,
        this.razred,
        this.idOdjeljenja,
      ]
    );
  }

  static async fetchAll(idNastavnik) {
    if (idNastavnik) {
      const odjeljenja = await db.execute(
        `SELECT o.oznaka_odjeljenja FROM balkon.odjeljenja_nastavnici odna 
        JOIN balkon.odjeljenja o JOIN balkon.nastavnici n 
        WHERE odna.id_odjeljenja = o.id_odjeljenja 
        AND odna.id_nastavnik = n.id_nastavnik 
        AND n.id_nastavnik = ${idNastavnik};`
      );
      const odjeljenjaInstances = odjeljenja[0].map((odjeljenje) => {
        return new Odjeljenje({
          idOdjeljenja: odjeljenje.id_odjeljenja,
          idSkolskaGodina: odjeljenje.id_skolska_godina,
          idNastavnikRazrednik: odjeljenje.id_nastavnik_razrednik,
          oznakaOdjeljenja: odjeljenje.oznaka_odjeljenja,
        });
      });
      return odjeljenjaInstances;
    } else {
      const odjeljenja = await db.execute('SELECT * FROM odjeljenja');
      const odjeljenjaInstances = odjeljenja[0].map((odjeljenje) => {
        return new Odjeljenje({
          idOdjeljenja: odjeljenje.id_odjeljenja,
          idSkolskaGodina: odjeljenje.id_skolska_godina,
          idNastavnikRazrednik: odjeljenje.id_nastavnik_razrednik,
          oznakaOdjeljenja: odjeljenje.oznaka_odjeljenja,
        });
      });
      return odjeljenjaInstances;
    }
  }

  static async findByPk(id) {
    const odjeljenje = await db.execute(
      'SELECT * FROM odjeljenja WHERE odjeljenja.id_odjeljenja = ? LIMIT 1',
      [id]
    );
    if (odjeljenje[0].length === 0) {
      return null;
    }
    const {
      id_odjeljenja,
      id_skolska_godina,
      id_nastavnik_razrednik,
      oznaka_odjeljenja,
      razred,
    } = odjeljenje[0][0];
    return new Odjeljenje({
      idOdjeljenja: id_odjeljenja,
      idSkolskaGodina: id_skolska_godina,
      idNastavnikRazrednik: id_nastavnik_razrednik,
      oznakaOdjeljenja: oznaka_odjeljenja,
      razred: razred,
    });
  }

  async delete() {
    if (this.idOdjeljenja === null) {
      throw new Error("Missing idOdjeljenja value. Delete can't be executed!");
    }
    const odjeljenje = await db.execute(
      'DELETE FROM odjeljenja WHERE id_odjeljenja = ?',
      [this.idOdjeljenja]
    );
    return odjeljenje[0];
  }
};
