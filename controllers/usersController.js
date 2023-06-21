const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs"); 
const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-email -password");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // récupèration des informations envoyées 
    const { firstname, lastname, email, city, password } = req.body;
    // récupere l'id envoyé par paramettre
    const idUserParam = req.params.id;
    // récupere l'id de l'utilisateur qui est connecté 
    const idUserConnecte = req.user.userId; // Utiliser _id au lieu de id

    //validations
    if (idUserParam !== idUserConnecte) { // Inverser la condition
      throw Error('Vous n\'avez pas le droit de modifier cet utilisateur!');
    }
    // mettre à jours les informations 
    const updateData = {}; // Créer un objet vide pour stocker les données à modifier
    if (firstname) updateData.firstname = firstname; // Ajouter les données à l'objet si elles existent
    if (lastname) updateData.lastname = lastname;
    if (email) updateData.email = email;
    if (city) updateData.city = city;
    if (password) {
      updateData.password = await bcryptjs.hash(password, 12); // Utiliser await pour attendre le hashage du mot de passe
    }

    // modifier l'utilisateur dans la bd en utilisant la méthode findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(idUserParam, updateData, { new: true }); // Passer l'objet updateData en deuxième argument et un objet avec l'option new: true en troisième argument

    res.status(201).json(updatedUser); // Renvoyer l'utilisateur modifié
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}
exports.getProfile = (req, res) => {
  const userId = req.user.userId; // Utiliser req.user._id au lieu de req.userData.userId
  console.log(userId);

  User.findById(userId)
    .select('-email -password')
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur introuvable.' });
      }
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: 'Une erreur est survenue.' });
    });
};

exports.deleteUser = async (req, res) => {
  const idUserParam = req.params.id;
  const idUserConnecte = req.user.userId;
  try {
    if(idUserParam !== idUserConnecte) {
      throw new Error("Vous n\'avez pas le droit de modifier cet utilisateur!")
    }
    const user = await User.findById(idUserParam);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    await User.deleteOne({ _id: idUserParam });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
