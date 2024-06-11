const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_WEBTOKEN, (err, decode) => {
      if (err) {
        console.error(err);
        return res.status(401).send({
          message: "Authentication failed. Invalid token.",
          success: false,
          error: err.message,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(401).send({
      message: "Authorization Failed",
      success: false,
      error: error.message,
    });
  }
};
