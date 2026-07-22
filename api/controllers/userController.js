const prisma = require('../lib/prisma.js');

async function userDetailsGet(req, res) {
    const userDetails = await prisma.user.findFirst({
        where: {
            id: req.user.id,
        }
    })

    res.json(userDetails);
}

async function updateUserPut(req, res) {
    const { email, username } = req.body;

    const updatedUser = await prisma.user.update({
        where: {id: req.user.id},
        data: {
            email,
            username
        }
    })

    res.json(updatedUser);
}

async function userDel(req, res) {
    const deleteUser = await prisma.user.delete({
        where: {
            id: req.user.id,
        }
    })

    res.json(deleteUser);
}

module.exports = {
    userDetailsGet,
    updateUserPut,
    userDel,
}