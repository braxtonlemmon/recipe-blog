const jsonwebtoken = require('jsonwebtoken');

function issueJWT(user) {
  // const expiresIn = 30;
  const payload = {
    id: user._id,
    // data: JSON.stringify(user),
    iat: Date.now(),
    exp: Math.floor(Date.now() / 1000) + 60
  };
  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET_OR_KEY );
  // return res.cookie('token', signedToken, {
  //   secure: false,
  //   httpOnly: true,
  // });
  return signedToken;
  // return {
  //   token: "Bearer " + signedToken
  // }
}

module.exports = issueJWT;
// module.exports.issueJWT = issueJWT