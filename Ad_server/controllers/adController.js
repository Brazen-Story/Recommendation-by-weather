const db = require('../db/config');
const connection = db.connection;

exports.getData = (req, res) => {
    const category = req.params.category;

    const sql = 'select * from ad_byweather where AD_ID = ?;'

    connection.query(sql, [category], async (err, result) => {
        if (err) {
            console.log(err);
          } else {
            res.json(result)
          }
    })
}