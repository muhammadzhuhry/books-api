const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const model = require('../models/author.model');
const Author = mongoose.model('author');

const authorController = {
  getHandler : (req, res) => {
    Author.find((err, value) => {
      if (err) {
        return res.status(500).send({'error':'An error has occurred'});
      }

      res.send({
        'code': 200,
        'success': 'true',
        'message': 'Request has been proceseed',
        'data': value
      });
    });
  },

  postHandler : (req, res) => {
    let payload = {
      author_id: uuidv4(),
      author_name: req.body.author_name
    }

    Author.create(payload, (err, value) => {
      if (err) {
        return res.status(500).send({'error':'An error has occurred'});
      }

      res.send({
        'code': 201,
        'success': 'true',
        'message': 'Author has been inserted',
        'data': value
      });
    })
  },

  putHandler : (req, res) => {
    let payload = {
      author_id: req.params.id
    }

    Author.findOneAndUpdate(payload, req.body, (err, value) => {
      if (err) {
        return res.status(500).send({'error':'An error has occurred'});
      }
  
      res.send({
        'code': 202,
        'success': 'true',
        'message': 'Author has been updated',
        'data': value
      });
    });
  },

  deleteHandler : (req, res) => {
    let payload = {
      author_id: req.params.id
    }

    Author.findOneAndRemove(payload, (err, value) => {
      if (err) {
        return res.status(500).send({'error':'An error has occurred'});
      }
      
      res.send({
        'code': 204,
        'success': 'true',
        'message': `Author ${value.author_name} has been deleted`
      });
    });
  }
}

module.exports = authorController;