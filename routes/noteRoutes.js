import express from 'express';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  trashNote,
  restoreNote,
  deleteNote,
} from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getNotes)
  .post(protect, createNote);

router.route('/:id')
  .get(protect, getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

router.route('/:id/trash').put(protect, trashNote);
router.route('/:id/restore').put(protect, restoreNote);

export default router;