const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  author_id: {
    type: String,
    require: true
  },
  author_name: {
    type: String,
    required: true
  }
});

mongoose.model('author', authorSchema);