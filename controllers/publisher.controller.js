const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const model = require('../models/publisher.model');
const Publisher = mongoose.model('publisher');

const publisherController = {
  getHandler : (req, res) => {
    Publisher.find({}, (err,  value) => {
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
      publisher_id: uuidv4(),
      publisher_name: req.body.publisher_name,
      city: req.body.city
    }

    Publisher.create(payload, (err, value) => {
      if (err) {
        return res.status(500).send({'error':'An error has occurred'});
      }
  
      res.send({
        'code': 201,
        'success': 'true',
        'message': 'Publisher has been inserted',
        'data': value
      });
    });
  },

  putHandler : (req, res) => {
    let payload = {
      publisher_id: req.params.id
    }

    Publisher.findOneAndUpdate(payload, req.body, (err, value) => {
      if (err) {
        return res.status(500).send({'error':'An error has occurred'});
      }
  
      res.send({
        'code': 202,
        'success': 'true',
        'message': 'Publisher has been updated',
        'data': value
      });
    });
  },

  deleteHandler : (req, res) => {
    let payload = {
      publisher_id: req.params.id
    }

    Publisher.findOneAndRemove(payload, (err, value) => {
      if (err) {
        return res.status(500).send({'error':'An error has occurred'});
      }
      
      res.send({
        'code': 204,
        'success': 'true',
        'message': `Publisher ${value.publisher_name} has been deleted`
      });
    });
  }
}

module.exports = publisherController;