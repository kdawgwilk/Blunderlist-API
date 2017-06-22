const express = require('express')
const router  = express.Router()
const Group   = require('./../models/group')
const Item    = require('./../models/item')

// Index
router.get('/groups', function (req, res) {
  Group.find(function (err, groups) {
    if (err) {
      res.json(err)
    } else {
      res.json(groups)
    }
  })
})

// Show
router.get('/groups/:id', function (req, res) {
  Group.findById(req.params.id, function (err, group) {
    if (err) {
      res.json(err)
    } else {
      res.json(group)
    }
  })
})

// Create
router.post('/groups', function (req, res) {
  const group = new Group(req.body)

  group.save(function (err) {
    if (err) {
      res.json(err)
    } else {
      res.status(201)
      res.json('Group Created Successfully')
    }
  })
})

// Update
// look up id in DB
// update the models properties based on the request
// save the changes back to the DB
router.put('/groups/:id', function (req, res) {
  Group.findByIdAndUpdate(req.params.id, { name: req.body.name }, function (err, group) {
    if (err) {
      res.json(err)
    } else {
      res.json(group)
    }
  })
})

// Destroy
router.delete('/groups/:id', function (req, res) {
  Group.findByIdAndRemove(req.params.id, function (err, group) {
    if (err) {
      res.json(err)
    } else {
      res.json(group)
    }
  })
})

router.get('/groups/:id/items', function (req, res) {
  Item.find({ groupId: req.params.id }, function (err, items) {
    res.json(items)
  })
})

module.exports = router