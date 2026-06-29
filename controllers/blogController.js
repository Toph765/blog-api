const prisma = require('../lib/prisma.js');

async function blogGet(req, res) {
    const posts = await prisma.post.findMany();
    
    return res.json(posts);
}

async function blogPost(req, res) {
    const {title, content} = req.body;

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            published: false,
            userId: req.user.id,
            author: req.user.username,
        }
    })

    return res.json(newPost)
}

module.exports = {
    blogGet,
    blogPost
}