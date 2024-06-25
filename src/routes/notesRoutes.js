const express = require('express');
const {
  getsNotes,
  createNotes,
  deleteNotes,
  updateNotes,
} = require('../controller/noteController');
const auth = require('../middlewares/auth');
const noteRouters = express.Router();

noteRouters.get('/', auth, getsNotes);

noteRouters.post('/createNotes', auth, createNotes);

noteRouters.delete('/:id', auth, deleteNotes);

noteRouters.put('/:id', auth, updateNotes);

module.exports = noteRouters;
