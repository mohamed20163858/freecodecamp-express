const bodyParser = require("body-parser");
let express = require('express');
let app = express();

console.log("Hello World");
function momo(req, res) {
    res.send('Hello Express');
  }
function momoFile(req, res) {
    const absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
}
require('dotenv').config();

const stylePath = __dirname + "/public";
const middleWare = express.static(stylePath);
app.use(bodyParser.urlencoded({extended: false}));
app.get("/",momoFile);
app.use("/public", middleWare);
app.get("/json",(req, res, next) => {
    const val = process.env.MESSAGE_STYLE;
    const obj = val === "uppercase" ?   {"message": "HELLO JSON"} : {"message": "Hello json"};
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
    // res.json(obj);
} );
app.get("/now",(req, res, next) => {
    req.time = new Date().toString();
    next();
} ,(req, res) => {
    res.json({"time": req.time})
});


app.get("/:word/echo", (req, res) => {
    res.json({echo: req.params.word})
});


app.route("/name").get((req, res) => {
    res.json({name: `${req.query.first} ${req.query.last}`})
}).post((req, res) => {
    res.json({name: `${req.body.first} ${req.body.last}`})
});


























 module.exports = app;
