const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.body.token;

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET, (err) => {
    //console.log(err)
    if (err) return res.sendStatus(403)
    next()
  })
}

module.exports = authenticateToken