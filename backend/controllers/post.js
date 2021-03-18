let models = require('../models');

exports.listMsg = (req, res, next) => {
    console.log("Je suis bien dans la fonction listMsg")
    models.post.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ error: 'Pas de post à afficher' })
            }
        })
        .catch(err => res.status(500).json(err))
}

exports.createMsg = (req, res, next) => {
    let uuid = req.params.uuid;
    console.log("Voici l'uuid : " + uuid)
    models.User.findOne({
        where: { uuid }
    })
        .then(user => {
            if (user) {
                let message = req.body.message;
                let titre = req.body.titre;
                if (message == 'null' && titre == 'null') {
                    res.status(400).json({ error: "Rien à publier" })
                }
                else {
                    console.log("tentative de post")
                    models.post.create({
                        message: message,
                        titre: titre,
                        userId: user.id
                    })
                        .then((newPost) => {
                            res.status(201).json(newPost)
                        })
                        .catch((err) => {
                            res.status(500).json(err)
                        })
                }
            }
            else {
                res.status(400).json(error);
            }
        })
        .catch(error => res.status(501).json(error));
}
exports.listMesMsg = (req, res, next) => {
    let uuid = req.params.uuid;
    console.log("Je suis bien dans la fonction listMesMsg " + uuid)
    models.User.findOne({
        include: [{
            model: models.post, as: 'post',
        }],
        where: { uuid },

    })
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ error: 'Pas de post à afficher' })
            }
        })
        .catch(err => res.status(500).json(err))
}




exports.deleteMsg = (req, res, next) => {
    let userOrder = req.body.userIdOrder;
    let uuid = req.params.uuid;
    models.User.findOne({
        where: { uuid }
    })
    .then(user => {
            if (user && (user.isAdmin == true || user.uuid == userOrder)) {
                console.log('Suppression du post id :', req.body.uuidPost);
                models.post
                    .findOne({
                        where: { uuidPost: req.body.uuidPost }
                    })
                    .then((postFind) => {
                        console.log("icitte je log le postFind : " + postFind)
                        if (postFind.attachement) {
                            const filename = postFind.attachement.split('/images/')[1];
                            console.log("teseeeest", filename);
                            fs.unlink(`images/${filename}`, () => {
                                models.post
                                    .destroy({
                                        where: { uuidPost: req.body.uuidPost }
                                    })
                                    .then(() => res.end())
                                    .catch(err => res.status(500).json(err))
                            })
                        }
                        else {
                            console.log("je suis bien dans le else et j'ai toujours : " + req.body.uuidPost)
                            models.post
                                .destroy({
                                    where: { uuidPost: req.body.uuidPost }
                                })

                                .then(() => res.end())
                                .catch(err => res.status(500).json(err))
                        }
                    })
                    .catch(err => res.status(500).json(err))
            } else { res.status(403).json('Utilisateur non autorisé à supprimer ce post') }
    })
    .catch(error => res.status(500).json(error));
}

exports.updateMsg = (req, res, next) => { }