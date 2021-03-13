const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.get('/',auth,  saucesCtrl.getAllSauces);

router.get('/:id', auth, saucesCtrl.getOneSauces);
router.post('/', auth, multer, saucesCtrl.createSauces);
router.post('/:id/like', auth, saucesCtrl.likeSauces);
router.put('/:id', auth, multer, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces);

module.exports = router;