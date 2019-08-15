// sudo service postgresql start

var spicedPg = require("spiced-pg");
var db = spicedPg("postgres:postgres:asus@localhost:5432/quiz");

exports.get9Questions = function() {
    return db.query(`SELECT * FROM questions LIMIT 9`);
};

exports.insertScore = function(n, s) {
    return db.query(`INSERT INTO highscore (name, score) VALUES ($1, $2)`, [
        n,
        s
    ]);
};

exports.getHighscore = function() {
    return db.query(`SELECT * FROM highscore ORDER BY score DESC LIMIT 10`);
};
