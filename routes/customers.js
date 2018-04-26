var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET all customers. */
router.get('/', (req, res, next) => {
    let Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.find({}).lean().exec((e, docs) => {
        res.json(docs);
        res.end();
    });
});

router.get('/:id', (req, res, next) => {
    let Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.find({ _id: req.params.id }).lean().exec((e, docs) => {
        res.json(docs);
        res.end();
    });
});

router.post('/', (req, res, next) => {
    let Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    let newCustomer = new Customer({ name: req.body.name, email: req.body.email });
    newCustomer.save((err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        } else {
            res.json(newCustomer._id);
            res.end();
        }
    })

});

router.put('/:id', (req, res, next) => {
    let Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err, doc) => {
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
    let Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.find({ _id: req.params.id }).remove((err) => {
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