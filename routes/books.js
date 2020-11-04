var express = require('express');
const { get } = require('.');
var router = express.Router();
var books = require('../resources/books');
//database collections
let Books = require('../models/books');


router.get('/add', function (req, res, next) {
    res.render('addBooks', {
        title: 'Add book',
    });
});


router.post('/save', function (req, res, next) {
    //console.log("in save function", req.body)
    // books.push({...req.body,_id:`00${books.length+1}`})
    // res.redirect('/');
    const book = new Books(req.body);
    let promise = book.save();
    promise.then(() =>{
        console.log('Book added');
        res.redirect('/');
    })
});

router.get('/remove/:id', function(req, res){
    Books.remove({ _id: req.params.id}, function(){
        res.redirect('/');
    })
    //console.log(req.params.id);
    // books.splice(req.params.index, 1);
    // res.redirect('/');
});

router.get('/edit/:_id', function(req, res){
// const book = books.find((book) => book._id === req.params._id);
//     res.render('editBooks', {
//         title: 'Edit book',
//         book
//     });

    Books.findOne({ _id: req.params._id} , function(err, book){
        res.render('editBooks', {title: 'Edit book', book:book});
    })
    
});

//findOneAndUpdate
router.post('/editSave/:_id', function (req, res){
    Books.findOneAndUpdate({ _id: req.params._id }, { $set: req.body }, function(err, book) {
    console.log(book);
    res.redirect('/');
    })

});

module.exports = router;