const { Router } = require('express');
const router = Router();
const verifycateToken = require('../controllers/verifyqueToken');

const { updateAdmin, authenticaAdmin, deleteAdmin, descriptionAdmin } = require('../controllers/admin.controller');

const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/admin.controller');

router.route('/information')
    .get(verifycateToken, descriptionAdmin)
router.route('/authenticate')
    .post(authenticaAdmin)
router.route('/update')//o email?
    .put(verifycateToken, updateAdmin)
router.route('/delete')
    .delete(verifycateToken, deleteAdmin)

router.route('/informationUsers')
    .get(verifycateToken, getUsers)
router.route('/informationUser')
    .get(verifycateToken, getUser)
router.route('/updateUser')//o email?
    .put(verifycateToken, updateUser)
router.route('/deleteUse')
    .delete(verifycateToken, deleteUser)
    
    
module.exports = router;