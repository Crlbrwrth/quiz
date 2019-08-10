DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question VARCHAR NOT NULL,
    correct VARCHAR NOT NULL,
    wrong_1 VARCHAR NOT NULL,
    wrong_2 VARCHAR NOT NULL,
    wrong_3 VARCHAR NOT NULL,
    explanation VARCHAR,
    difficulty INT,
    image VARCHAR
);

INSERT INTO questions (question, correct, wrong_1, wrong_2, wrong_3)
VALUES ('What is the data type of NaN?', 'number', 'undefined', 'null', 'watermelon');

INSERT INTO questions (question, correct, wrong_1, wrong_2, wrong_3)
VALUES ('Which of the following evaluates to "false"?', '!!false', '!undefined', '!!!!true', '!!!false');

INSERT INTO questions (question, correct, wrong_1, wrong_2, wrong_3)
VALUES ('Which of the following is not a Javascript Loop?', 'while in loop', 'for of loop', 'do while loop', 'for in loop');
