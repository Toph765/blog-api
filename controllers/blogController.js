const prisma = require('../lib/prisma.js');

async function blogGet(req, res) {
    const posts = await prisma.post.findMany();

    return res.json(posts);
}

/* async function blogPost(req, res) {
    
} */

module.exports = {
    blogGet,
}