const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const homeRouter = require("./app/router/homeRouter");
// const router = require("./app/router/router");

const app = express();

app.use(bodyParser.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

// === reglage cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Access-Control-Allow-Headers, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
    if (req.method === "OPTIONS") {
        return res.status(200).send("OK");
      }
    next();
});

// === on require le home router en dernier
// app.use(router);
app.use(homeRouter);

app.listen(PORT, () => {
    console.log("Server ready, listening on port " + PORT);
});