const Distance = require("../models/distance.model.js");
const sql = require("../models/db.js");

/**
 * Create and Save the distance record of the user
 * @param {user_id, distance_in_km} req 
 */
exports.create = (req, res) => {
  /**
   * Validate request
   */
  if (!req.body) {
    res.status(400).send({
      message: "body cannot be empty"
    });
  }
  if (!req.body.user_id || !req.body.distance_in_km) {
    res.status(400).send({
        message: "missing required attributes user_id/distance_in_km"
    });
  }

  const distance = new Distance ({
    user_id: req.body.user_id,
    distance_in_km: req.body.distance_in_km,
    created_at: req.body.created_at || new Date,
    updated_at: req.body.updated_at || new Date
  });

  /**
   * Save User distance in the database
   */
  Distance.create(distance, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

/**
 * Fetch the distance covered by user between two different timestamps
 * @param {user_id, end_date, start_date} req 
 */
exports.getDistanceBetweenTimestamps = (req, res) => {
    if (!req.body.user_id || !req.body.start_date || !req.body.end_date) {
        res.status(400).send({
            message: "Missing required attributes"
        })
    }
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;

    const distance_query = `
        SELECT sum(distance_in_km) AS distance FROM distances WHERE created_at between '${startDate}' and '${endDate}';
    `
    sql.query(distance_query, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while fetching the record."
            });
        } else {
            res.send(data)
        };
      });
  };