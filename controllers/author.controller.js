const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const model = require('../models/author.model');
const Author = mongoose.model('author');
const response = require('../helper/wrapper');
const { ERROR: httpError } = require('../helper/httpError');

const authorController = {
  getHandler : (req, res) => {
    Author.find((err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      if (value.length > 0) {
        response.wrapper_success(res, 200, 'Request has been proceseed', value);
      } else {
        response.wrapper_error(res, httpError.NOT_FOUND, 'Data author is not found');
      }

    });
  },

  postHandler : (req, res) => {
    let payload = {
      author_id: uuidv4(),
      author_name: req.body.author_name
    }

    Author.create(payload, (err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      response.wrapper_success(res, 201, 'Author has been inserted', value);
    });
  },

  putHandler : (req, res) => {
    let payload = {
      author_id: req.params.id
    }

    Author.findOneAndUpdate(payload, req.body, (err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }
      
      if (value != null) {
        response.wrapper_success(res, 202, 'Author has been updated', value);
      } else {
        response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Failed to update author');
      }

    });
  },

  deleteHandler : (req, res) => {
    let payload = {
      author_id: req.params.id
    }

    Author.findOneAndRemove(payload, (err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      if (value != null) {
        res.send({
          'code': 204,
          'success': 'true',
          'message': `Author ${value.author_name} has been deleted`
        });
      } else {
        response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Failed to delete author');
      }

    });
  }
}

module.exports = authorController;