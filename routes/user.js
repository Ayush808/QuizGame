const express = require('express')
const router = express.Router()

const { requireSignIn, isAdmin, isAuth } = require('../controllers/auth')
const { userById, readUser, updateUser, top10Quizer } = require('../controllers/user')

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get('/user/:userId', requireSignIn, isAuth, readUser)
router.put('/user/:userId', requireSignIn, isAuth, updateUser)
router.get('/users', top10Quizer)

router.param("userId", userById)

module.exports = router