const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const model = require('../models/book.model');
const Book = mongoose.model('book');
const response = require('../helper/wrapper');
const { ERROR: httpError } = require('../helper/httpError');

const bookController = {
  getHandler : (req, res) => {
    Book.aggregate([
      {
        $lookup :
        {
          from : 'authors',
          localField : 'author_id',
          foreignField : 'author_id',
          as : 'author'
        }
      },
      {
        $unwind : '$author'
      },
      {
        $lookup :
        {
          from : 'publishers',
          localField : 'publisher_id',
          foreignField : 'publisher_id',
          as : 'publisher'
        }
      },
      {
        $unwind : '$publisher'
      },
      {
        $project :
        {
            book_id: '$book_id', 
            title: '$title',
            author: '$author.author_name', 
            publisher: '$publisher.publisher_name',
            qty: '$qty'
        }
      }
    ], (err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      if (value.length > 0) {
        response.wrapper_success(res, 200, 'Request has been proceseed', value);
      } else {
        response.wrapper_error(res, httpError.NOT_FOUND, 'Data book is not found');
      }

    });
  },

  postHandler : async(req, res) => {
    let payload = {
      book_id: uuidv4(),
      title: req.body.title,
      author_id: req.body.author_id,
      publisher_id: req.body.publisher_id,
      qty: req.body.qty
    }

    Book.create(payload, (err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      response.wrapper_success(res, 201, 'Book has been inserted', value);
    });
  },

  putHandler : (req, res) => {
    let payload = {
      book_id: req.params.id
    }

    Book.findOneAndUpdate(payload, req.body, (err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }
      
      if (value != null) {
        response.wrapper_success(res, 202, 'Book has been updated', value);
      } else {
        response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Failed to update book');
      }

    });
  },

  deleteHandler : (req, res) => {
    let payload = {
      book_id: req.params.id
    }

    Book.findOneAndRemove(payload, (err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      if (value != null) {
        res.send({
          'code': 204,
          'success': 'true',
          'message': `Book ${value.title} has been deleted`
        });
      } else {
        response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Failed to delete book');
      }

    });
  }
}

module.exports = bookController;