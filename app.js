const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blogRouter = require('./routes/blogRouter.js');
// const authRouter = require('./routes/authRouter.js');

const PORT = process.env.PORT || 3000;

app.use("/posts", blogRouter);
// app.use("/auth", authRouter);

app.listen(PORT, () => { console.log(`Express app listening on port ${PORT}`) });
