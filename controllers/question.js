const Question = require('../models/Question')
// const formidable = require('formidable')
// const _ = require('lodash')
//error handler

const { errorHandler } = require('../validator/ErrorHandler')

exports.createQuestion = (req, res) => {
    console.log('Question creating log')
    const questionObj = new Question(req.body)

    questionObj.save((err, que) => {
        if (err) {
            return res.status(400).json({ err: errorHandler(err) })
        }
        res.json({ que })
    })
}

exports.queById = (req, res, next, id) => {
    Question.findById(id).exec((err, question) => {
        if (err || !question) {
            return res.status(400).json({
                error: "No such Question found!"
            })
        }
        req.question = question
        next()
    })
}

//read the question from the req
exports.questionById = (req, res) => {
    //options are made undefined bcz we dont want it be shown in the response
    req.question.option = undefined
    return res.json(req.question)
}

// delete the product by id
exports.deleteQuestion = (req, res) => {
    const question = req.question

    question.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Question deleted'
        })
    })
}
// update question
exports.updateQuestion = (req, res) => {
    let Question = req.question
    Question.question = req.body.question
    Question.answer = req.body.answer
    Question.options = req.body.options

    Question.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.findQuestions = (req, res) => {
    //let limit = req.query.limit ? parseInt(req.query.limit) : 9
    Question.aggregate([{ $sample: { size: 10 } }], (err, questions) => {
        if (err) {
            return res.status(400).json({
                error: 'Questions not found'
            })
        }
        res.json(questions)
    })
}
