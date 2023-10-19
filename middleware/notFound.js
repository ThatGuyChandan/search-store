const notFound = (req, res) => res.status(404).send("routes do not exist");
module.exports = notFound;
