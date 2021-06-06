const { Router } = require('express');
const router = Router();

const { getUsers, getUser, getUserByName, createUser, updateUser, deleteUser } = require('../controllers/users.controllers');

router.route('/')
    //.get((req, res) => res.json({message: 'Get Request'}))
    //.post((req, res) => res.send('POST - USER ROUTES'))
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    /*.get((req, res) => res.send({name:'UserName', lastname: 'UserLastName'}))
    .put((req, res) => res.send({message:'User upgraded'}))
    .delete((req, res) => res.send({message:'User deleted'}))*/
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/user/:name')
    .get(getUserByName)

module.exports = router;