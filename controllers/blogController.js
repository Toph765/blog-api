const prisma = require('../lib/prisma.js');

async function blogGet(req, res) {
    const posts = await prisma.post.findMany();

    return res.json(posts);
}

async function blogPost(req, res) {
    const {title, content} = req.body;

    const newBlog = await prisma.post.create({
        data: {
            title,
            content,
            published: false,
            userId: req.user.id,
            author: req.user.username,
        }
    });

    return res.json(newBlog);
}

async function addCommentPost(req, res) {
    const {content} = req.body;

    const newComment = await prisma.comment.create({
        data: {
            content,
            userId: req.user.id,
            author: req.user.username,
            postId: parseInt(req.params.blogId)
        }
    });

    return res.json(newComment);
}

module.exports = {
    blogGet,
    blogPost,
    addCommentPost
}