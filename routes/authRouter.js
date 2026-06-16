const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');

authRouter.post("/sign-up", authController.signUpPost);

module.exports = authRouter;