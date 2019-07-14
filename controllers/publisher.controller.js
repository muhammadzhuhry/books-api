const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const model = require('../models/publisher.model');
const Publisher = mongoose.model('publisher');
const response = require('../helper/wrapper');
const { ERROR: httpError } = require('../helper/httpError');

const publisherController = {
  getHandler : (req, res) => {
    Publisher.find((err,  value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      if (value.length > 0) {
        response.wrapper_success(res, 200, 'Request has been proceseed', value);
      } else {
        response.wrapper_error(res, httpError.NOT_FOUND, 'Data publisher is not found');
      }

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
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      response.wrapper_success(res, 201, 'Publisher has been inserted', value);
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

      if (value != null) {
        response.wrapper_success(res, 202, 'Publisher has been updated', value);
      } else {
        response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Failed to update publisher');
      }

    });
  },

  deleteHandler : (req, res) => {
    let payload = {
      publisher_id: req.params.id
    }

    Publisher.findOneAndRemove(payload, (err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      if (value != null) {
        res.send({
          'code': 204,
          'success': 'true',
          'message': `Publisher ${value.publisher_name} has been deleted`
        });
      } else {
        response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Failed to delete publisher');
      }
    });
  }
}

module.exports = publisherController;