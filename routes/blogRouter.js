const { Router } = require('express');
const blogRouter = Router();
const blogController = require('../controllers/blogController');
const passport = require('passport');
const auth = require('../lib/auth').auth;

blogRouter.get("/", auth, blogController.blogGet);
//blogRouter.post("/", blogController.blogPost);

module.exports = blogRouter;