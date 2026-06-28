function ageCheckMiddleware(req, res, next) {
  let age = req.query.age;
  if (!(age >= 18)) {
    return res.json({ message: "Ghar Jao!!!" });
  }
  next();
}

function adhaarCardCheckMiddleware(req, res, next) {
  let adhaar = req.query.adhaar;
  if (!adhaar) {
    return res.json({ message: "Adhaar is not eligible" });
  }
  next();
}

module.exports = { ageCheckMiddleware, adhaarCardCheckMiddleware };
