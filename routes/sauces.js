const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// Si on veut toute les sauces
router.get('/',auth,  saucesCtrl.getAllSauces);

// Si on selectionne une sauce
router.get('/:id', auth, saucesCtrl.getOneSauces);
//Si on crée une sauce
router.post('/', auth, multer, saucesCtrl.createSauces);
// Si on aime ou aime pas une sauce
router.post('/:id/like', auth, saucesCtrl.likeSauces);
// Si on modifie une sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauces);
// Si on supprime une sauce
router.delete('/:id', auth, saucesCtrl.deleteSauces);

module.exports = router;