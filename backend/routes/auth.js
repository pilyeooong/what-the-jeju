const express = require('express');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();

router.get('/kakao', passport.authenticate('kakao'));

// router.get('/kakao/callback', async (req, res, next) => {
//   passport.authenticate('kakao', (err, user, info) => {
//     if (err) {
//       console.error(err);
//       next(err);
//     }
//     if (info){
//       return res.status(401).send(info.reason);
//     }
//     return req.login(user, async (loginErr) => {
//       if (loginErr) {
//         console.err(loginErr);
//         return next(loginErr);
//       }
//       const loginUser = await User.findOne({
//         where : { id: user.id },
//       });
//       return res.status(200).send(loginUser).redirect('/');
//     })
//   })(req, res, next);
// });

router.get("/kakao/callback",
    passport.authenticate("kakao"),
    (req, res) => {
      
        res.redirect("http://localhost:3000");
    });

module.exports = router;
