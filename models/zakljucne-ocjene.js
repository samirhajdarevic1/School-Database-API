const db = require('../util/database');

module.exports = class ZakljucnaOcjena {
  constructor({
    idZakljucnaOcjena,
    idSkolskaGodina,
    idPredmet,
    idUcenik,
    zakljucnaOcjena,
  }) {
    this.idZakljucnaOcjena = idZakljucnaOcjena;
    this.idSkolskaGodina = idSkolskaGodina;
    this.idPredmet = idPredmet;
    this.idUcenik = idUcenik;
    this.zakljucnaOcjena = zakljucnaOcjena;
  }

  async save() {
    if (!this.idZakljucnaOcjena) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const insertedZakljucnaOcjena = await db.execute(
      'INSERT INTO zakljucne_ocjene (id_skolska_godina, id_predmet, id_ucenik, zakljucna_ocjena) VALUES (?,?,?, ?)',
      [
        this.idSkolskaGodina,
        this.idPredmet,
        this.idUcenik,
        this.zakljucnaOcjena,
      ]
    );
    this.idZakljucnaOcjena = insertedZakljucnaOcjena[0].insertId;
  }

  async update() {
    const updatedZakljucnaOcjena = await db.execute(
      'UPDATE zakljucne_ocjene SET id_skolska_godina = ?, id_predmet = ?, id_ucenik = ?, id_zakljucna_ocjena WHERE id_zakljucna_ocjena = ?',
      [
        this.idSkolskaGodina,
        this.idPredmet,
        this.idUcenik,
        this.idZakljucnaOcjena,
      ]
    );
  }

  static async fetchAll() {
    console.log(123);
    const zakljucneOcjene = await db.execute('SELECT * FROM zakljucne_ocjene');
    console.log(zakljucneOcjene[0]);
    const zakljucneOcjeneInstances = zakljucneOcjene[0].map((zakljOcjena) => {
      console.log(zakljOcjena);
      return new ZakljucnaOcjena({
        idZakljucnaOcjena: zakljOcjena.id_zakljucna_ocjena,
        idSkolskaGodina: zakljOcjena.id_skolska_godina,
        idPredmet: zakljOcjena.id_predmet,
        idUcenik: zakljOcjena.id_ucenik,
      });
    });
    return zakljucneOcjeneInstances;
  }

  static async findByPk(id) {
    const zakljucnaOcjena = await db.execute(
      'SELECT * FROM zakljucne_ocjene WHERE zakljucne_ocjene.id_zakljucna_ocjena = ? LIMIT 1',
      [id]
    );
    if (zakljucnaOcjena[0].length === 0) {
      return null;
    }
    const {
      id_zakljucna_ocjena,
      id_skolska_godina,
      id_predmet,
      id_ucenik,
      zakljucna_ocjena,
    } = zakljucnaOcjena[0][0];
    return new ZakljucnaOcjena({
      idZakljucnaOcjena: id_zakljucna_ocjena,
      idSkolskaGodina: id_skolska_godina,
      idPredmet: id_predmet,
      idUcenik: id_ucenik,
      zakljucnaOcjena: zakljucna_ocjena,
    });
  }

  async delete() {
    if (this.idZakljucnaOcjena === null) {
      throw new Error(
        "Missing idZakljucnaOcjena value. Delete can't be executed!"
      );
    }
    const zakljOcjena = await db.execute(
      'DELETE FROM zakljucne_ocjene WHERE id_zakljucna_ocjena = ?',
      [this.idZakljucnaOcjena]
    );
    return zakljOcjena[0];
  }
};
