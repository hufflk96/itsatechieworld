const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const { withAuth } = require('../../utils/auth');

// Anything and everything posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'content',
            'title',
            'created_at',
          ],
        order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        console.log(newPost);
        res.json(newPost)
    }
    catch (err) {
        res.status(500).json(err);
    }
})
router.get('/:id', async (req, res) => {
    try {
        const result = await Post.findByPk(req.params.id);
        if (result) {
            const post = result.get({ plain: true });
            res.status(200).json(post);
        } else {
            res.status(404).json({ "error": "Post not found" });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})
router.put('/:id', withAuth, async (req, res) => {
    try {
        const result = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if (!result) {
            res.status(404).json({ "message": "Post not found" })
        }
        res.status(200).json(result);

    }
    catch (err) {
        res.status(500).json(err);
    }
})
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const result = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!result) {
            res.status(404).json({ "message": "Post not found" })
        }
        res.status(200).json(result);

    }
    catch (err) {
        res.status(500).json(err);
    }
})





module.exports = router;
