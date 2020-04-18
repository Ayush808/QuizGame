const User = require('../models/user')

// const { errorHandler } = require('../validator/ErrorHandler')


exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "user not found"
            })
        }
        req.profile = user
        next()
    })
}


exports.readUser = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    return res.json(req.profile)
}

exports.updateUser = (req, res) => {
    console.log('user update', req.body)
    //req.body.role = 0; // role will always be 0
    User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorized to perform this action'
            });
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    })
}

exports.top10Quizer = (req, res) => {

    let user = req.query.user ? req.query.user : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 10

    User.find()
        .sort([[sortBy, user]])
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    error: 'Users not found'
                });
            }
            res.json(users)
        })

}
