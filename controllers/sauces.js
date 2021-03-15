const Sauces = require('../models/sauces');
const fs = require('fs');


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

exports.modifySauces = (req, res, next) => {
  const sauces = new Sauces({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    manufacturer: req.body.manufacturer,
    userId: req.body.userId,
    mainPepper: req.body.mainPepper,
    imageUrl: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename

  });
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
        sauces.likes = 1;
      } else if (like.likes == 0) {
        sauces.likes = 0;
      }
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