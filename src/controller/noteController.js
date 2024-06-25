const noteModeel = require('../models/notes');

const createNotes = (req, res) => {
  console.log("userid ==> ", req.userId);
};
const updateNotes = (req, res) => {};
const deleteNotes = (req, res) => {};
const getsNotes = (req, res) => {};

module.exports = {
  createNotes,
  updateNotes,
  deleteNotes,
  getsNotes,
};
