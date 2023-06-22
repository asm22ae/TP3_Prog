// Gérer les erreurs 404 (si la page demandée n'existe pas)
exports.get404 = (req, res) => {
    res.status(404).json({ message: "Page introuvable" });
  };

// Renvoyer une erreur 500 si une erreur se produit dans le serveur
exports.logErrors = (err, req, res, next) => {
    res.status(500).json({ message: "Une erreur est survenue" });
  };
  