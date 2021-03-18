const Sauces = require('../models/sauces');
const fs = require('fs');

// Création d'une sauce
exports.createSauces = (req, res, next) =>{
	const saucesObjet = JSON.parse(req.body.sauce);
	const sauces = new Sauces(
	{
		userId: req.body.userId,
		...saucesObjet,
		manufacturer: saucesObjet.manufacturer,
		imageUrl: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
  	});
	delete sauces._id;
	sauces.save(sauces)
	.then(()=> res.status(201).json({message: "Objet enregistré"}))
	.catch(error => res.status(500).json({error}));
};

// Recherche d'une sauce
exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id
  }).then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Modification d'une sauce
exports.modifySauces = (req, res, next) => {
	let sauces;
	try
	{
		JSON.parse(req.body.sauce);
		sauces = {
			...JSON.parse(req.body.sauce),
			imageUrl: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename

		};
	}
	catch
	{
		sauces = {
			...req.body
		};
	}
  Sauces.updateOne({_id: req.params.id}, sauces).then(
    () => {
      res.status(201).json({
        message: 'Sauces updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// Like ou Dislike une sauce
exports.likeSauces = (req, res, next) => {
  const like = new Sauces({
    likes: req.body.like,
    userId: req.body.userId
  });
  Sauces.findOne({
    _id: req.params.id
  }).then(
    (sauces) => {
      Sauces.updateOne({_id: req.params.id}, sauces)
      
      if (like.likes == 1) {
        let Disliked = sauces.usersDisliked.indexOf(like.userId);
        if (Disliked > -1) {
          sauces.usersDisliked.splice(Liked, 1);
          sauces.dislikes = sauces.dislikes -1;
        }
        sauces.likes = sauces.likes +1;
        sauces.usersLiked.push(like.userId);
      } else if (like.likes == 0) {
        let Liked = sauces.usersLiked.indexOf(like.userId);
        if (Liked > -1) {
          sauces.usersLiked.splice(Liked, 1);
          sauces.likes = sauces.likes -1;
        }
        let Disliked = sauces.usersDisliked.indexOf(like.userId);
        if (Disliked > -1) {
          sauces.usersDisliked.splice(Liked, 1);
          sauces.dislikes = sauces.dislikes -1;
        }
      } else if (like.likes == -1) {
        sauces.dislikes = sauces.dislikes +1;
        sauces.usersDisliked.push(like.userId);
    }
      console.log(sauces);
			sauces.save(sauces)
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Supprime une sauce
exports.deleteSauces = (req, res, next) => {
  Sauces.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// Cherche toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauces.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};