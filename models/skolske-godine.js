const db = require('../util/database');

module.exports = class SkolskaGodina {
  constructor({ idSkolskaGodina, skolskaGodina }) {
    this.idSkolskaGodina = idSkolskaGodina;
    this.skolskaGodina = skolskaGodina;
  }

  async save() {
    if (!this.idSkolskaGodina) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const insertedSkolskaGodina = await db.execute(
      'INSERT INTO skolske_godine (skolska_godina) VALUES (?)',
      [this.skolskaGodina]
    );
    this.idSkolskaGodina = insertedSkolskaGodina[0].insertId;
  }

  async update() {
    const updatedSkolskaGodina = await db.execute(
      'UPDATE skolske_godine SET skolska_godina = ? WHERE id_skolska_godina = ?',
      [this.skolskaGodina, this.idSkolskaGodina]
    );
  }

  static async fetchAll() {
    const skolskeGodine = await db.execute('SELECT * FROM skolske_godine');

    const skolskeGodineInstances = skolskeGodine[0].map((skolskaGodina) => {
      return new SkolskaGodina({
        idSkolskaGodina: skolskaGodina.id_skolska_godina,
        skolskaGodina: skolskaGodina.skolska_godina,
      });
    });
    return skolskeGodineInstances;
  }

  static async findByPk(id) {
    const skolskaGod = await db.execute(
      'SELECT * FROM skolske_godine WHERE skolske_godine.id_skolska_godina = ? LIMIT 1',
      [id]
    );
    if (skolskaGod[0].length === 0) {
      return null;
    }
    const { id_skolska_godina, skolska_godina } = skolskaGod[0][0];
    return new SkolskaGodina({
      idSkolskaGodina: id_skolska_godina,
      skolskaGodina: skolska_godina,
    });
  }

  async delete() {
    if (this.idSkolskaGodina === null) {
      throw new Error(
        "Missing idSkolskaGodina value. Delete can't be executed!"
      );
    }
    const skolskaGodina = await db.execute(
      'DELETE FROM skolske_godine WHERE id_skolska_godina = ?',
      [this.idSkolskaGodina]
    );
    return skolskaGodina[0];
  }
};
