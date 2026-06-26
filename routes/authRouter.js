const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');

authRouter.post("/sign-up", authController.signUpPost);
authRouter.post("/log-in", authController.logInPost);

module.exports = authRouter;