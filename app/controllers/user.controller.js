const User = require("../models/user.model.js");

/**
 * Create and Save a new User
 * @param {email, name} req 
 */
exports.create = (req, res) => {
  //  Validate request
  if (!req.body) {
    res.status(400).send({
      message: "body cannot be empty"
    });
  }

  // Create a User
  const user = {
    email: req.body.email,
    name: req.body.name,
  };

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

/**
 * Retrieve all Users from the database.
 */
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

/**
 * Delete a User with the specified user_id in the request
 * @param {user_id} req 
 */
exports.delete = (req, res) => {
  User.remove(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.user_id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};


