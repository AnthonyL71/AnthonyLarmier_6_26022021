const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// Routes 
// Search all sauces
router.get('/',auth,  saucesCtrl.getAllSauces);
// Select one sauce
router.get('/:id', auth, saucesCtrl.getOneSauces);
// Create one sauce
router.post('/', auth, multer, saucesCtrl.createSauces);
// Like or Dislike one sauce
router.post('/:id/like', auth, saucesCtrl.likeSauces);
// Modify one sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauces);
// Deleted one sauce
router.delete('/:id', auth, saucesCtrl.deleteSauces);

module.exports = router;