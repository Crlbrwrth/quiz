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

INSERT INTO questions (question, correct, wrong_1, wrong_2, wrong_3)
VALUES ('0/0 evaluates to ...', 'NaN', 'undefined', 'Infinity', '0');

INSERT INTO questions (question, correct, wrong_1, wrong_2, wrong_3)
VALUES ('1/null evaluates to ...', 'Infinity', '0', 'NaN', '42');

INSERT INTO questions (question, correct, wrong_1, wrong_2, wrong_3)
VALUES ('What does the "this" keyword refer to?', 'the object from where it was called', 'the function from where it was called', 'the scope from where it was called', 'Math.random()');

INSERT INTO questions (question, correct, wrong_1, wrong_2, wrong_3)
VALUES ('What is the result of parseInt (4, 4)?', 'NaN', 'disco duck', '4', '16');

INSERT INTO questions (question, correct, wrong_1, wrong_2, wrong_3)
VALUES ('Which of these is not a Javascript Error?', 'Crunch time error', 'Load time error', 'Run time error', 'Logical Error');

INSERT INTO questions (question, correct, wrong_1, wrong_2, wrong_3)
VALUES ('Which of these is not an array method?', 'explode()', 'push()', 'pop()', 'slice()');
