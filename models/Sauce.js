
const mongoose = require('mongoose');
// Modele pour les sauces
const saucesSchema = mongoose.Schema({
	name : {type: String, required: true},
	manufacturer : {type: String, required: true},
	userId : {type: String, required: true},
	description : {type: String, required: true},
	mainPepper : {type: String, required: true},
	imageUrl : {type: String},
	heat : {type: Number, required: true},
	likes : {type: Number, default: 0},
	dislikes : {type: Number, default: 0},
	usersLiked : {type: [String], default: []},
	usersDisliked : {type: [String], default: []}
},);

module.exports = mongoose.model('Sauces', saucesSchema);