const sql = require("./db.js");

// constructor
class Distance {
  constructor(Distance) {
    this.id = Distance.id;
    this.user_id = Distance.user_id;
    this.distance_in_km = Distance.distance_in_km;
    this.created_at = Distance.created_at;
    this.updated_at = Distance.updated_at;
  }
  
  static create(newDistance, result) {
    sql.query("INSERT INTO distances SET ?", newDistance, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created Distance: ", { id: res.insertId, ...newDistance });
      result(null, { id: res.insertId, ...newDistance });
    });
  }
}


module.exports = Distance;
