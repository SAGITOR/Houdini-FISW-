const { Router } = require('express');
const router = Router();
const verifycateToken = require('../controllers/verifyqueToken');

const { getDocuments, getDocument, createDocument, deleteDocument, updateDocument } = require('../controllers/documents.controller');

router.route('/getDocuments')
    .get(verifycateToken, getDocuments)
router.route('/getDocument')
    .post(verifycateToken, getDocument)
router.route('/createDocument')
    .post(verifycateToken, createDocument)
router.route('/updateDocument')//o email?
    .put(verifycateToken, updateDocument)
router.route('/deleteDocument')
    .delete(verifycateToken, deleteDocument)

module.exports = router;