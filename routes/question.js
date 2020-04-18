const express = require('express')
const router = express.Router()

const { requireSignIn, isAdmin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user')
const { createQuestion, queById, findQuestions, questionById, deleteQuestion, updateQuestion } = require('../controllers/question')

router.post('/admin/question/create/:userId', requireSignIn, isAuth, isAdmin, createQuestion) // done by postman
router.get('/questions/:userId', requireSignIn, isAuth, findQuestions)  // done by postman
router.get('/singleque/:queId/:userId', requireSignIn, isAdmin, isAuth, questionById) // done by postman
router.delete('/admin/deleteQuestion/:queId/:userId', requireSignIn, isAuth, isAdmin, deleteQuestion) // done by postman
router.put('/admin/updateque/:queId/:userId', requireSignIn, isAuth, isAdmin, updateQuestion) // 

router.param("queId", queById)
router.param("userId", userById)

module.exports = router