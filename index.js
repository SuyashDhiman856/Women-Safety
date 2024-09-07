const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "script")));
app.use(require(path.join(__dirname, "router/router.js")))

app.listen(port, () => {
    console.log(`Women safety app is running on ${port}`);
})