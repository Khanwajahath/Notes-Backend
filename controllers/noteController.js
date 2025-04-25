import asyncHandler from 'express-async-handler';
import Note from '../models/noteModel.js';

// @desc    Get all notes for a user
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ userId: req.user._id });
  res.json(notes);
});

// @desc    Get a single note
// @route   GET /api/notes/:id
// @access  Private
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (note) {
    res.json(note);
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

// @desc    Create a note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  const { title, content, coverImage, icon } = req.body;

  const note = await Note.create({
    title: title || 'Untitled',
    content: content || '',
    coverImage: coverImage || null,
    icon: icon || null,
    userId: req.user._id,
  });

  res.status(201).json(note);
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, coverImage, icon } = req.body;

  const note = await Note.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (note) {
    note.title = title !== undefined ? title : note.title;
    note.content = content !== undefined ? content : note.content;
    note.coverImage = coverImage !== undefined ? coverImage : note.coverImage;
    note.icon = icon !== undefined ? icon : note.icon;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

// @desc    Move a note to trash
// @route   PUT /api/notes/:id/trash
// @access  Private
const trashNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (note) {
    note.isDeleted = true;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

// @desc    Restore a note from trash
// @route   PUT /api/notes/:id/restore
// @access  Private
const restoreNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (note) {
    note.isDeleted = false;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

// @desc    Delete a note permanently
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (note) {
    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

export {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  trashNote,
  restoreNote,
  deleteNote,
};