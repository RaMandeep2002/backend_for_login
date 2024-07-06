const noteModeel = require('../models/notes');

const createNotes = async (req, res) => {
  const { title, description } = req.body;
  console.log('Title ====> ', title);
  console.log('description ====> ', description);
  // console.log('userid ==> ', req.userId);
  try {
    const newNote = await noteModeel.create({
      title,
      description,
      userId: req.userId,
    });
    res
      .status(201)
      .json({ message: 'Note created successfully', note: newNote });
  } catch (error) {
    console.error('Error in createNotes:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
const updateNotes = async (req, res) => {
  console.log('error');
  const { id } = req.params;
  console.log('id ====>', id);
  const { title, description } = req.body;
  console.log('title ====>', title);
  console.log('description ====>', description);
  try {
    const updatenotes = await noteModeel.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, description },
      { new: true }
    );
    if (!updatenotes) {
      return res.status(400).json({
        message: "Note not found or you're not authorized to update it",
      });
    }
    res
      .status(200)
      .json({ message: 'Note updated successfully', note: updatenotes });
  } catch (error) {
    console.error('Error in updateNotes:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
const deleteNotes = async (req, res) => {
  const { id } = req.params;

  try {
    const deletenotes = await noteModeel.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deletenotes) {
      res.status(404).json({
        message: "Note not found or you're not authorized to delete it",
      });
    }

    res.status(200).json({ message: 'Note deletd Succefully' });
  } catch (error) {
    console.error('Error in deleteNotes:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
const getsNotes = async (req, res) => {
  try {
    const notes = await noteModeel.find({ userId: req.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'somthing worong' });
  }
};

module.exports = {
  createNotes,
  updateNotes,
  deleteNotes,
  getsNotes,
};
