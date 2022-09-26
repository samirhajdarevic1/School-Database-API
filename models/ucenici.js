const db = require('../util/database');

module.exports = class Ucenik {
  constructor({ idUcenik, ime, prezime, birthday }) {
    this.idUcenik = idUcenik;
    this.ime = ime;
    this.prezime = prezime;
    this.birthday = birthday;
  }

  async save() {
    if (!this.idUcenik) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const savedUcenik = await db.execute(
      'INSERT INTO ucenici (ime, prezime, birthday) VALUES (?, ?, ?)',
      [this.ime, this.prezime, this.birthday]
    );
    this.idUcenik = savedUcenik[0].insertId;
  }

  async update() {
    const updatedUcenik = await db.execute(
      'UPDATE ucenici SET ime = ?, prezime = ?, birthday = ? WHERE id_ucenik = ?',
      [this.ime, this.prezime, this.birthday, this.idUcenik]
    );
  }

  static async fetchAll(idOdjeljenja) {
    if (idOdjeljenja) {
      const ucenici = await db.execute(
        `SELECT u.ime, u.prezime FROM balkon.ucenik_odjeljenje  uo 
        JOIN balkon.odjeljenja o 
        JOIN balkon.ucenici u 
        WHERE balkon.uo.id_odjeljenja = o.id_odjeljenja 
        AND balkon.uo.id_ucenik = u.id_ucenik
        AND o.id_odjeljenja = ${idOdjeljenja}
        ;`
      );
      const uceniciInstances = ucenici[0].map((ucenik) => {
        return new Ucenik({
          idUcenik: ucenik.idUcenik,
          ime: ucenik.ime,
          prezime: ucenik.prezime,
          birthday: ucenik.birthday,
        });
      });
      return uceniciInstances;
    } else {
      const ucenici = await db.execute('SELECT * FROM ucenici');
      const uceniciInstances = ucenici[0].map((ucenik) => {
        return new Ucenik({
          idUcenik: ucenik.idUcenik,
          ime: ucenik.ime,
          prezime: ucenik.prezime,
          birthday: ucenik.birthday,
        });
      });
      return uceniciInstances;
    }
  }

  static async findByPk(id) {
    const ucenik = await db.execute(
      'SELECT * FROM ucenici WHERE ucenici.id_ucenik = ? LIMIT 1',
      [id]
    );
    if (ucenik[0].length === 0) {
      return null;
    }
    const { id_ucenik, ime, prezime, birthday } = ucenik[0][0];
    return new Ucenik({ idUcenik: id_ucenik, ime, prezime, birthday });
  }

  async delete() {
    if (this.idUcenik === null) {
      throw new Error("Missing idNastavnik value. Delete can't be executed!");
    }
    const ucenik = await db.execute('DELETE FROM ucenici WHERE id_ucenik = ?', [
      this.idUcenik,
    ]);
    return ucenik[0];
  }
};
