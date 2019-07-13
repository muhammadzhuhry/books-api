const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publisherSchema = new Schema({
  publisher_id: {
    type: String,
    required: true
  },
  publisher_name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

mongoose.model('publisher', publisherSchema);