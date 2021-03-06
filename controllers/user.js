const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const MaskData = require('maskdata');

// Signup
exports.signup = (req, res, next) => {
  // [A-Z and a-Z] or [a-z and 0-9]
  var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
  if (mediumRegex.test(req.body.password) == false) {
     res.status(400).json({ error }) 
  } else {
    const maskedEmail = MaskData.maskEmail2(req.body.email, emailMask2Options);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            email: req.body.email,
            emailmasked: maskedEmail,
            password: hash
          });
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
};

  // Mail MaskData
  const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
  };

  // Login
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };