var express = require('express');
var router = express.Router();
var books = require('../resources/books');
let Books = require('../models/books');
/* GET home page. */

//Promise
// router.get('/', function(req, res, next) {
//   //res.render('index', { title: 'Book DB', bookList:books });
//   Books.find({}, function(err, books) {
//     if (!err) {
//       res.render('index', { title: 'Book App', bookList: books });
//     } else {
//       console.log('error', err);
//     }
//   })

// });

//async await
router.get('/', async function(req, res, next) {
  //res.render('index', { title: 'Book DB', bookList:books });
  let books = await Books.find();
  //console.log(books);
  res.render('index', { title: 'Book App', bookList: books });
});

module.exports = router;
