const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
require('./lib/passport.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

const blogRouter = require('./routes/blogRouter.js');
const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');

const PORT = process.env.PORT || 3000;

app.use("/posts", blogRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(PORT, () => { console.log(`Express app listening on port ${PORT}`) });
