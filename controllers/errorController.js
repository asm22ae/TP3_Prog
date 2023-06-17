exports.get404 = (req, res) => {
    res.status(404).json({ message: "Page introuvable" });
  };
  
  exports.logErrors = (err, req, res, next) => {
    res.status(500).json({ message: "Une erreur est survenue" });
  };
  