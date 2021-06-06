const { Router } = require('express');
const router = Router();
const verifycateToken = require('../controllers/verifyqueToken');

const { emotionKeywords } = require('../controllers/apis.controller');

router.route('/keywords')
    .post(verifycateToken, emotionKeywords)

module.exports = router;