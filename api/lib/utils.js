const jsonwebtoken = require('jsonwebtoken');

function issueJWT(user) {
  const expiresIn = 30;
  const payload = {
    id: user._id,
    iat: Date.now()
  };
  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: expiresIn });
  
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports.issueJWT = issueJWT