const express  = require('express')
const router   = express.Router()
const mongoose = require('mongoose')
const User     = require('./../models/user')


// Index
router.get('/users', function (req, res) {
    User.find({ deletedOn: null })
        .select('-password')
        .exec(function (err, users) {
            res.json(users)
        })
})

// Show
router.get('/users/:username', function (req, res) {
    User.findOne({ 
        username: req.params.username,
        deletedOn: null
    }, function (err, user) {
        res.json(user)
    })
})

// Create
router.post('/users', function (req, res) {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    })

    user.save(function (err, user) {
        if (err) {
            res.json(err)
        } else {
            res.status(201)
            res.json(user)
        }
    })
})

// Update
router.put('/users/:id', function (req, res) {
    User.findByIdAndUpdate(
        req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            updatedOn: new Date()
        },
        { new: true, runValidators: true },
        function (err, user) {
            res.json(user)
        })
})

// Destroy
router.delete('/users/:id', function (req, res) {
    User.findByIdAndUpdate(
        req.params.id, 
        { deletedOn: new Date() },
        { new: true, runValidators: true },
        function (err, user) {
            res.json(user)
        })
})


module.exports = router