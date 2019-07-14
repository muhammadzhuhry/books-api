const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  book_id: {
    type: String,
    require: true
  },
  title: {
    type: String,
    required: true
  },
  author_id: {
    type: String,
    required: true
  },
  publisher_id: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
});

mongoose.model('book', bookSchema);