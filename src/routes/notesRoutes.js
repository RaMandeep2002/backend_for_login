const express = require('express');
const {
  getsNotes,
  createNotes,
  deleteNotes,
  updateNotes,
} = require('../controller/noteController');
const auth = require('../middlewares/auth');
const noteRouters = express.Router();

noteRouters.get('/getsNotes', auth, getsNotes);

noteRouters.post('/createNotes', auth, createNotes);

noteRouters.delete('/deleteNotes/:id', auth, deleteNotes);

noteRouters.put('/updateNotes/:id', auth, updateNotes);

module.exports = noteRouters;
