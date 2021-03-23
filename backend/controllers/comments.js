let models = require('../models');
const user = require('../models/user');

exports.createComments = (req, res, next) => {
    console.log('test create')
    let uuidPost = req.body.uuidPost
    let uuid = req.params.uuid
    models.post.findOne({
        where: { uuidPost }
    })
        .then(post => {
            if (post) {
                let postId = post.postId
                models.User.findOne({
                    where: { uuid }
                }).then(user => {
                    models.comment.create({
                        message: req.body.message,
                        userId: user.id,
                        postId: postId
                    })
                        .then((newComment) => { res.status(201).json(newComment) })
                        .catch((err) => { res.status(500).json(err) })
                })
                    .catch((err) => { res.status(500).json(err) })

            } else { res.status(400).json(error) }

        }).catch((err) => res.status(500).json(err))
}


exports.deleteComments = (req, res, next) => {
    console.log("test delete")
    let userIsAdmin = req.body.userIsAdmin;
    let uuidComment = req.body.uuidComment;
    let uuid = req.params.uuid;

    models.comment.findOne({
        include: [{
            model: models.User, as: 'user',
        }],
        where: { uuidComment }
    })
        .then(comment => {
            if (comment(userIsAdmin == 1 || comment.user.uuid == uuid)) {
                models.comment.destroy({
                    where: { uuidComment }
                })
                    .then(() => res.end())
                    .catch((err => res.status(500).json(err)))
            }
        })
        .catch((err => res.status(500).json(err)))
}
