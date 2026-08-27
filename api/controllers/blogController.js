const prisma = require('../lib/prisma.js');

async function allBlogGet(req, res) {
    const posts = await prisma.post.findMany({
        where: {
            published: true,
        }
    });

    return res.json(posts);
}

async function blogGet(req, res) {
    const blog = await prisma.post.findFirst({
        where: {
            id: parseInt(req.params.blogId),
        }
    });

    return res.json(blog);
}

async function blogPost(req, res) {
    const {title, content, published} = req.body;

    const newBlog = await prisma.post.create({
        data: {
            title,
            content,
            published,
            userId: req.user.id,
            author: req.user.username,
        }
    });

    return res.json(newBlog);
}

async function updateBlogPut(req, res) {
    const {title, content, published} = req.body;

    const updatedBlog = await prisma.post.update({
        where: {id: parseInt(req.params.blogId)},
        data: {
            title,
            content,
            published
        }
    })

    return res.json(updatedBlog);
}

async function deleteBlogDel(req, res) {
    const deleteBlog = await prisma.post.delete({
        where: {
            id: parseInt(req.params.blogId)
        }
    })

    return res.json(deleteBlog);
}

async function getComments(req, res) {
    const comments = await prisma.comment.findMany({
        where: {
            postId: parseInt(req.params.blogId),
        }
    })

    return res.json(comments);
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

async function updateCommentPost(req, res) {
    const {content} = req.body;

    const updatedComment = await prisma.comment.update({
        where: { id: parseInt(req.params.commentId) },
        data :  { content },
    })

    res.json(updatedComment);
}

async function commentDel(req, res) {
    const deletedComment = await prisma.comment.delete({
        where: {
            id: parseInt(req.params.commentId),
        }
    })

    res.json(deletedComment);
}

module.exports = {
    allBlogGet,
    blogGet,
    blogPost, 
    updateBlogPut, 
    deleteBlogDel,
    getComments,
    addCommentPost,
    updateCommentPost,
    commentDel
}