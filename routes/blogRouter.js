const { Router } = require('express');
const blogRouter = Router();
const blogController = require('../controllers/blogController');
const passport = require('passport');
const auth = require('../lib/auth').auth;

blogRouter.get("/", blogController.blogGet);
blogRouter.post("/", auth, blogController.blogPost);
blogRouter.post("/:blogId", auth, blogController.addCommentPost);

module.exports = blogRouter;