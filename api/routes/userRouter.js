const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');
const auth = require('../lib/auth').auth;

userRouter.get("/", auth, userController.userDetailsGet);
userRouter.put("update", auth, userController.updateUserPut);
userRouter.delete("/delete", auth, userController.userDel);

module.exports = userRouter;

