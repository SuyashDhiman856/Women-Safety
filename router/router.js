const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
    res.render('home');
})

router.get("/images/:url", (req, res) => {
    res.sendFile(path.join(__dirname, `../static/Images/${req.params.url}`));
})

router.get("/complaint", (req, res) => {
    res.render('pages/complaint');
})

router.get("/precautions", (req, res) => {
    res.render('pages/precautions');
})

router.get("/emergency", (req, res) => {
    res.render('pages/emergency');
})

router.get("/guidelines", (req, res) => {
    res.render('pages/guidelines');
})

router.get("/map", (req, res) => {
    res.render('pages/maps');
})

router.get("/login", (req, res) => {
    res.render('pages/login');
})

router.get("/script/:script", (req, res) => {
    res.sendFile(path.join(__dirname, `../static/scripts/${req.params.script}`));
})

router.get("/audio/:audio", (req, res) => {
    res.sendFile(path.join(__dirname, `../static/audio/${req.params.audio}`));
})

router.get("/css/:styles", (req, res) => {
    res.sendFile(path.join(__dirname, `../static/styles/${req.params.styles}`));
})


module.exports = router;