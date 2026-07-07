const { Router } = require('express');
const blogRouter = Router();
const blogController = require('../controllers/blogController');
const auth = require('../lib/auth').auth;

blogRouter.get("/", blogController.blogGet);
blogRouter.post("/", auth, blogController.blogPost);
blogRouter.put("/:blogId", auth, blogController.updateBlogPut);
blogRouter.delete("/:blogId", auth, blogController.deleteBlogDel);

blogRouter.post("/:blogId", auth, blogController.addCommentPost);
blogRouter.put("/:blogId/comments/:commentId", auth, blogController.updateCommentPost);
blogRouter.delete("/:blogId/comments/:commentId/delete", auth, blogController.commentDel);

module.exports = blogRouter;