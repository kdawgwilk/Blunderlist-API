const express = require('express')
const router  = express.Router()

router.get('/login', function (req, res) {
    res.render('login')
})

router.get('/auth/google', function (req, res) {
    res.send("Google Login")
})

module.exports = router