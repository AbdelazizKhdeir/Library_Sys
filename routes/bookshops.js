const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all
router.get('/', (req, res) => {
  db.query('SELECT * FROM Bookshop', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// GET by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM Bookshop WHERE bookshop_id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});
// POST
router.post('/', (req, res) => {
  const { name, location, contact_number } = req.body;
  db.query(`INSERT INTO Bookshop (name, location, contact_number) VALUES (?, ?, ?)`,
    [name, location, contact_number],
    (err, results) => {
      if (err) throw err;
      res.json({ message: 'Bookshop added', id: results.insertId });
    });
});
// PUT
router.put('/:id', (req, res) => {
  const { name, location, contact_number } = req.body;
  db.query(`UPDATE Bookshop SET name = ?, location = ?, contact_number = ? WHERE bookshop_id = ?`,
    [name, location, contact_number, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: 'Bookshop updated' });
    });
});
// PATCH
router.patch('/:id', (req, res) => {
  const updates = req.body;
  const keys = Object.keys(updates);
  const values = Object.values(updates);
  if (keys.length === 0) return res.status(400).json({ error: 'No fields to update' });
  const query = `UPDATE Bookshop SET ` + keys.map(k => `${k} = ?`).join(', ') + ` WHERE bookshop_id = ?`;
  db.query(query, [...values, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Bookshop patched' });
  });
});
// DELETE
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM Bookshop WHERE bookshop_id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Bookshop deleted' });
  });
});
module.exports = router;
