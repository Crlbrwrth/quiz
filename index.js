//REQUREMENTS********************

const express = require("express");
const app = express();
const db = require("./utils/db");
const csurf = require("csurf");
const compression = require("compression");
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

// MIDDLEWARE****************

app.use(require("body-parser").json());
app.use(express.static("./public"));
app.use(cookieSessionMiddleware);
app.use(compression());
app.use(csurf());

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

// ROUTES ***************************

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

(async () => {
    let x = await db.get3Questions();
    console.log("x !!!: ", x);
})();

app.listen(8080, function() {
    console.log("I'm listening.");
});
