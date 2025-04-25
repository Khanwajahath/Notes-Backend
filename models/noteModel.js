import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Untitled',
    },
    content: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;