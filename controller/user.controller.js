const db = require("../db");

class UserController {
  async createUser(req, res) {
    const { name, surname } = req.body;
    const newPerson = await db.query(
      "INSERT INTO person (name, surname) values ($1, $2) RETURNING *",
      [name, surname]
    );

    res.json(newPerson.rows[0]);
  }
  async getUsers(req, res) {
    const person = await db.query("SELECT * FROM person");

    res.json(person.rows);
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    const person = await db.query("SELECT * FROM person WHERE id = $1", [id]);

    res.json(person.rows[0]);
  }
  async updateUser(req, res) {
    const { id, name, surname } = req.body;
    const newPerson = await db.query(
      "UPDATE person SET name = $1, surname = $2 WHERE id = $3 RETURNING *",
      [name, surname, id]
    );

    res.json(newPerson.rows[0]);
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    const newPerson = await db.query("DELETE FROM person WHERE id = $1", [id]);

    res.json(newPerson.rows[0]);
  }
}

module.exports = new UserController();
