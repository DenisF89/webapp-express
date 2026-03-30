const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../data/db");

// CREAZIONE DI UN USER con Bcrypt
/* router.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword)=>{
      const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
      return db.query(sql, [username, hashedPassword]);
    })
    .then(([result])=>{
      res.json({message:"Utente creato"});
    }).catch(err=>{next(err);
    });
}); */

// LOGIN
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username])
  .then(([result])=>{
    if (result.length === 0) {
      return res.status(401).json({ message: "Utente non trovato" });
    }

    const user = result[0];

    return bcrypt.compare(password, user.password)
    .then((isMatch)=>{
      if (!isMatch){return res.status(401).json({message:"Password errata"});}

      res.json({  message: "Login riuscito",
                  user: {
                      id: user.id,
                      username: user.username
                    }
      });
    });
  })
  .catch(err=>{next(err)});

});

module.exports = router;