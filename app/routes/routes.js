module.exports = app => {
  const userController = require("../controllers/user.controller.js");
  const distanceController = require("../controllers/distance.controller.js");
  // Create a new User
  app.post("/users", userController.create);

  // Retrieve all Users
  app.get("/users", userController.findAll);

  // Delete a User with user_id
  app.delete("/users/:user_id", userController.delete);

  // create the distance record for the user
  app.post("/users/distance", distanceController.create);

  // fetch the total distance travelled by the user between two timestamps
  app.get("/users_distance", distanceController.getDistanceBetweenTimestamps);

};
