const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all
router.get('/', (req, res) => {
  db.query('SELECT * FROM Author', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// GET by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM Author WHERE author_id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});
// POST
router.post('/', (req, res) => {
  const { name, nationality, birth_year } = req.body;
  db.query(`INSERT INTO Author (name, nationality, birth_year) VALUES (?, ?, ?)`,
    [name, nationality, birth_year],
    (err, results) => {
      if (err) throw err;
      res.json({ message: 'Author added', id: results.insertId });
    });
});
// PUT
router.put('/:id', (req, res) => {
  const { name, nationality, birth_year } = req.body;
  db.query(`UPDATE Author SET name = ?, nationality = ?, birth_year = ? WHERE author_id = ?`,
    [name, nationality, birth_year, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: 'Author updated' });
    });
});
// PATCH
router.patch('/:id', (req, res) => {
  const updates = req.body;
  const keys = Object.keys(updates);
  const values = Object.values(updates);
  if (keys.length === 0) return res.status(400).json({ error: 'No fields to update' });
  const query = `UPDATE Author SET ` + keys.map(k => `${k} = ?`).join(', ') + ` WHERE author_id = ?`;
  db.query(query, [...values, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Author patched' });
  });
});
// DELETE
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM Author WHERE author_id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Author deleted' });
  });
});
module.exports = router;
