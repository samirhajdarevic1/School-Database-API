const db = require('../util/database');

module.exports = class Ocjena {
  constructor({
    idOcjena,
    ucenik,
    nastavnik,
    predmet,
    idOdjeljenja,
    idUcenik,
    idNastavnik,
    idPredmet,
    datum,
    ocjena,
    opis,
    razred,
  }) {
    this.idOcjena = idOcjena;
    this.ucenik = ucenik;
    this.nastavnik = nastavnik;
    this.predmet = predmet;
    this.idOdjeljenja = idOdjeljenja;
    this.idUcenik = idUcenik;
    this.idNastavnik = idNastavnik;
    this.idPredmet = idPredmet;
    this.datum = datum;
    this.ocjena = ocjena;
    this.opis = opis;
    this.razred = razred;
  }

  async save() {
    if (!this.idOcjena) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const insertedOcjena = await db.execute(
      'INSERT INTO ocjene ( id_odjeljenja, id_ucenik, id_nastavnik, id_predmet, datum, ocjena, opis) VALUES ( ?, ?, ?, ?, ?, ?, ?)',
      [
        this.idOdjeljenja,
        this.idUcenik,
        this.idNastavnik,
        this.idPredmet,
        this.datum,
        this.ocjena,
        this.opis,
      ]
    );
    this.idOcjena = insertedOcjena[0].insertId;
  }

  async update() {
    const updatedOcjena = await db.execute(
      'UPDATE ocjene SET id_odjeljenja = ?, id_ucenik = ?, id_nastavnik = ?, id_predmet = ?, datum = ?, ocjena = ?, opis = ? WHERE id_ocjena = ?',
      [
        this.idOdjeljenja,
        this.idUcenik,
        this.idNastavnik,
        this.idPredmet,
        this.datum,
        this.ocjena,
        this.opis,
        this.idOcjena,
      ]
    );
  }

  static async fetchAll(idOdjeljenja, idUcenik) {
    console.log(idUcenik, idOdjeljenja);
    if (idOdjeljenja && idUcenik) {
      const ocjene = await db.execute(
        `SELECT 
        CONCAT(u.ime, ' ', u.prezime) as ucenik,
            o.id_ocjena, 
              o.id_odjeljenja, 
              CONCAT(n.ime, ' ',  n.prezime) as nastavnik,
              o.datum, 
              o.ocjena,
              p.naziv,
              CONCAT(od.razred, ' ',  od.oznaka_odjeljenja) as razred
          FROM ocjene o
          LEFT JOIN nastavnici n ON o.id_nastavnik = n.id_nastavnik
          LEFT JOIN predmeti p ON o.id_predmet = p.id_predmet
          LEFT JOIN ucenici u ON o.id_ucenik = u.id_ucenik
          LEFT JOIN odjeljenja od ON o.id_odjeljenja = od.id_odjeljenja
          WHERE o.id_odjeljenja = ${idOdjeljenja} 
          AND o.id_ucenik = ${idUcenik}
          ;`
      );
      const ocjeneInstances = ocjene[0].map((ocjena) => {
        return new Ocjena({
          idOcjena: ocjena.id_ocjena,
          nastavnik: ocjena.nastavnik,
          predmet: ocjena.naziv,
          datum: ocjena.datum,
          ocjena: ocjena.ocjena,
          naziv: ocjena.naziv,
          razred: ocjena.razred,
        });
      });
      return ocjeneInstances;
    }
    if (idUcenik) {
      const ocjene = await db.execute(
        `SELECT 
        o.id_ocjena, 
          o.id_odjeljenja, 
          CONCAT(n.ime, ' ',  n.prezime) as nastavnik,
          o.datum, 
          o.ocjena,
          p.naziv,
          CONCAT(od.razred, ' ',  od.oznaka_odjeljenja) as razred
      FROM ocjene o
      LEFT JOIN nastavnici n ON o.id_nastavnik = n.id_nastavnik
      LEFT JOIN predmeti p ON o.id_predmet = p.id_predmet
      LEFT JOIN odjeljenja od ON o.id_odjeljenja = od.id_odjeljenja
      WHERE o.id_ucenik = ${idUcenik}`
      );
      const ocjeneInstances = ocjene[0].map((ocjena) => {
        return new Ocjena({
          idOcjena: ocjena.id_ocjena,
          nastavnik: ocjena.nastavnik,
          datum: ocjena.datum,
          ocjena: ocjena.ocjena,
          naziv: ocjena.naziv,
          razred: ocjena.razred,
        });
      });
      return ocjeneInstances;
    }
    const ocjene = await db.execute(`SELECT 
    CONCAT(u.ime, ' ', u.prezime) as ucenik,
        o.id_ocjena, 
          o.id_odjeljenja, 
          CONCAT(n.ime, ' ',  n.prezime) as nastavnik,
          o.datum, 
          o.ocjena,
          p.naziv,
          CONCAT(od.razred, ' ',  od.oznaka_odjeljenja) as razred
      FROM ocjene o
      LEFT JOIN nastavnici n ON o.id_nastavnik = n.id_nastavnik
      LEFT JOIN predmeti p ON o.id_predmet = p.id_predmet
      LEFT JOIN ucenici u ON o.id_ucenik = u.id_ucenik
      LEFT JOIN odjeljenja od ON o.id_odjeljenja = od.id_odjeljenja`);
    const ocjeneInstances = ocjene[0].map((ocjena) => {
      return new Ocjena({
        ucenik: ocjena.ucenik,
        idOcjena: ocjena.id_ocjena,
        nastavnik: ocjena.nastavnik,
        datum: ocjena.datum,
        ocjena: ocjena.ocjena,
        naziv: ocjena.naziv,
        razred: ocjena.razred,
      });
    });
    return ocjeneInstances;
  }

  static async findByPk(id) {
    const ocj = await db.execute(
      'SELECT * FROM ocjene WHERE ocjene.id_ocjena = ? LIMIT 1',
      [id]
    );
    if (ocj[0].length === 0) {
      return null;
    }
    const {
      id_ocjena,
      id_odjeljenja,
      id_ucenik,
      id_nastavnik,
      id_predmet,
      datum,
      ocjena,
      opis,
    } = ocj[0][0];
    return new Ocjena({
      idOcjena: id_ocjena,
      idOdjeljenja: id_odjeljenja,
      idUcenik: id_ucenik,
      idNastavnik: id_nastavnik,
      idPredmet: id_predmet,
      datum,
      ocjena,
      opis,
    });
  }

  static async deleteByPk(id) {
    const deletedOcjena = await db.execute(
      'DELETE FROM ocjene WHERE id_ocjena = ?',
      [id]
    );
    return deletedOcjena[0];
  }

  async delete() {
    if (this.idOcjena === null) {
      throw new Error("Missing idOcjena value. Delete can't be executed!");
    }
    const ocj = await db.execute('DELETE FROM ocjene WHERE id_ocjena = ?', [
      this.idOcjena,
    ]);
    return ocj[0];
  }
};
