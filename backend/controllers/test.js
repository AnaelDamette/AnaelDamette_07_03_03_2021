

function deleteAllPost() {

    models.post.findAll({
        where: { userId: user.id }
    })
        .then((response) => {
            console.dir("   pourquoi ici ?")
            if (response.length > 0) {
                response.forEach(post => {
                    deleteAllArrayPost(post)
                })
                return
            } else { return }

        })
}

function deleteAllArrayPost() {
    if (post) {
        if (post.attachement) {
            const filename = post.attachement.split('/images/')[1];
            console.log("j'ai supprimé le file name  ")
            fs.unlink(`images/${filename}`, () => {
                console.log("est-ce que j'arrive icci ?")

                models.post.destroy({
                    where: { uuidPost }
                }).then(() => res.end())
                    .catch(err => res.status(500).json(err))
                console.log('et ici ?')
            })
            return
        } else {
            models.post.destroy({
                where: { uuidPost }
            }).then(() => res.end())
                .catch(err => res.status(500).json(err))
            return
        }
    } else { return }
}
