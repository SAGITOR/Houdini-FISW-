const { Router } = require('express');
const router = Router();
const verifycateToken = require('../controllers/verifyqueToken');

const { createUser, updateUser, authenticaUser, deleteUser, descriptionUser } = require('../controllers/user.controllers');

router.route('/create')
    .post(createUser)
router.route('/authenticate')
    .post(authenticaUser)
router.route('/information')
    .get(verifycateToken, descriptionUser)
router.route('/update')//o email?
    .put(verifycateToken, updateUser)
router.route('/delete')
    .delete(verifycateToken, deleteUser)
    
module.exports = router;