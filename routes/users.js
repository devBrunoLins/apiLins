var express = require('express');
var router = express.Router();
var db = require('../db/db');

router.get('/', (req, res, next) => {
    let Users = db.Mongoose.model('users', db.UsersSchema, 'users');
    Users.find({}).lean().exec((e, docs) => {
        res.json(docs);
        res.end();
    });
});

router.get('/:id', (req, res, next) => {
    let Users = db.Mongoose.model('users', db.UsersSchema, 'users');
    Users.find({ _id: req.params.id }).lean().exec((e, docs) => {
        res.json(docs);
        res.end();
    });
});

router.post('/', (req, res, next) => {
    let User = db.Mongoose.model('users', db.UsersSchema, 'users');
    let newUser = new User({ name: req.body.name, age: req.body.age, address: req.body.address });
    newUser.save((err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        } else {
            res.json(newUser._id);
            res.end();
        }
    })

});

router.put('/:id', (req, res, next) => {
    let Users = db.Mongoose.model('users', db.UsersSchema, 'users');
    Users.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        } else {
            res.status(200).json(req.body);
            res.end();
        }
    })
});

router.delete('/:id', (req, res, next) => {
    let User = db.Mongoose.model('users', db.UsersSchema, 'users');
    User.find({ _id: req.params.id }).remove((err) => {
        if (err) {
            res.status(500).json({ err: err.message });
            res.end();
            return;
        } else {
            res.status(200).json({ success: true });
            res.end();
        }
    })
});

module.exports = router;