DROP TABLE IF EXISTS highscore;

CREATE TABLE highscore (
    id SERIAL PRIMARY KEY,
    name VARCHAR (32) NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO highscore (name, score) VALUES ('Jerry', 23);
INSERT INTO highscore (name, score) VALUES ('Summer', 200);
INSERT INTO highscore (name, score) VALUES ('Morty', 89);
INSERT INTO highscore (name, score) VALUES ('Beth', 223);
INSERT INTO highscore (name, score) VALUES ('Rick', 321853294634);
