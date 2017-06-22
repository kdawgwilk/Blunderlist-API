const express  = require('express')
const router   = express.Router()
const mongoose = require('mongoose')
const Item     = require('./../models/item')
const Group    = require('./../models/group')


router.get('/items/search', function (req, res) {
    Item.findByName(req.query.search_term, function(err, items) {
        res.json(items)
    })
})

// Index
router.get('/items', function (req, res) {
    Item.find(function(err, items) {
        res.json(items)
    })
})

// Show
router.get('/items/:id', function (req, res) {
    Item.findById(req.params.id, function(err, item) {
        res.json(item)
    })
})

// Create
router.post('/items', function (req, res) {
    const item = new Item({
        name: req.body.name,
        groupId: req.body.groupId,
        completed: req.body.completed
    })
    
    item.save()
    res.status(201)
    res.json(item)
})

// Update
router.put('/items/:id', function (req, res) {
    Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        groupId: req.body.groupId,
        completed: req.body.completed
    }, { new: true, runValidators: true }, function (err, item) {
        if (err) {
            res.json(err)
        } else {
            res.json(item)
        }
    })
})

// Destroy
router.delete('/items/:id', function (req, res) {
    Item.findByIdAndRemove(req.params.id, (err, item) => {
        res.json(item)
    })
})



module.exports = router


