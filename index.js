//REQUREMENTS********************

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "*:*" });

const db = require("./utils/db");
const csurf = require("csurf");
const compression = require("compression");
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

var redis = require("redis");
var client = redis.createClient({
    host: "localhost",
    port: 6379
});
client.on("error", function(err) {
    console.log(err);
});

// MIDDLEWARE****************

app.use(require("body-parser").json());
app.use(express.static("./public"));
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(compression());

// ROUTES ***************************

app.get("/questions/json", async (req, res) => {
    let questions = await db.get3Questions();
    res.json(questions.rows);
});

app.get("/score/json", async (req, res) => {
    let resp = await db.getHighscore();
    res.json(resp.rows);
});

app.post("/insert-score/json", async (req, res) => {
    await db.insertScore(req.body.name, req.body.score);

    let highscore = JSON.stringify({
        name: req.body.name,
        score: req.body.score
    });
    console.log("stringified highscore: ", highscore);
    client.set("highscore", highscore, function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log("highscore key set successfully");

        client.get("highscore", function(err, data) {
            if (err) {
                return console.log(err);
            }
            console.log('The value of the "highscore" key is ' + data);
            console.log("highscore after parse: ", JSON.parse(data));
        });
    });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080, function() {
    console.log("I'm listening.");
    client.set("players", "[]", (err, data) => {
        if (err) return console.log(err);
    });
});

//SERVER SIDE SOCKET.IO CODE

io.on("connection", async function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    socket.on("disconnect", async function() {
        console.log("socket disconnected: ", socket.id);
        client.get("players", function(err, data) {
            if (err) {
                return console.log(err);
            }
            let players = JSON.parse(data);
            players = players.filter(ele => ele.id != socket.id);
            let updPlayers = JSON.stringify(players);
            client.set("players", updPlayers, function(err, data) {
                if (err) {
                    return console.log(err);
                }
            });
        });
    });

    socket.on("player-registration", async name => {
        let id = socket.id;
        client.get("players", function(err, data) {
            if (err) {
                return console.log(err);
            }
            if (data) {
                let players = JSON.parse(data);
                players.push({ id, name, score: 0 });
                players = JSON.stringify(players);
                client.set("players", players, function(err, data) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
            if (!data) {
                let players = JSON.stringify([{ id, name, score: 0 }]);
                client.set("players", players, function(err, data) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
        });
    });
    socket.on("go", async () => {
        client.get("players", function(err, data) {
            if (err) {
                return console.log(err);
            }
            let players = JSON.parse(data);
            for (let i = 0; i < players.length; i++) {
                if (players[i].id == socket.id) {
                    players[i].ready = true;
                    let updPlayers = JSON.stringify(players);
                    client.set("players", updPlayers, function(err, data) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                    if (players.every(ele => ele.ready)) {
                        console.log("everybody is ready");
                        io.emit("start game", players);
                    } else {
                        console.log("missing players");
                        break;
                    }
                }
            }
        });
    });
    socket.on("answer", async answer => {
        client.get("players", function(err, data) {
            if (err) {
                return console.log(err);
            }
            let players = JSON.parse(data);
            players = players.map(ele => {
                if (ele.id == socket.id) {
                    ele.score += answer.num;
                    ele.answered = true;
                    ele.over = answer.over;
                }
                return ele;
            });
            let updPlayers = JSON.stringify(players);
            client.set("players", updPlayers, function(err, data) {
                if (err) {
                    return console.log(err);
                }
            });
            if (players.every(ele => ele.over)) {
                return client.get("players", function(err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    let players = JSON.parse(data);
                    io.emit("end game", players);
                });
            }
            if (players.every(ele => ele.answered)) {
                io.emit("next question", players);
                players = players.map(ele => {
                    ele.answered = false;
                    return ele;
                });
                updPlayers = JSON.stringify(players);
                client.set("players", updPlayers, function(err, data) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
        });
    });
});
