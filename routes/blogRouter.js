const { Router } = require('express');
const blogRouter = Router();
const blogController = require('../controllers/blogController');

blogRouter.get("/", blogController.blogGet);
//blogRouter.post("/", blogController.blogPost);

module.exports = blogRouter;