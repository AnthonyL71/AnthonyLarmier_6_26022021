const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
// Si on s'inscrit
router.post('/signup', userCtrl.signup);
// Si on se connecte
router.post('/login', userCtrl.login);

module.exports = router;