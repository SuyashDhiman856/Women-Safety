const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

router.get("/script/index.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.js"));
})

router.get("/images/Womens-Safety-in-India", (req, res) => {
    res.sendFile(path.join(__dirname, `../Images/Womens-Safety-in-India.png`));
})

router.get("/images/logo", (req, res) => {
    res.sendFile(path.join(__dirname, "../Images/protection.png"));
})

router.get("/complaint", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/complaint.html"));
})

router.get("/precautions", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/precautions.html"));
})

router.get("/emergency", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/emergency.html"));
})

router.get("/guidelines", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/guidelines.html"));
})

router.get("/map", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/maps.html"));
})

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/login.html"));
})

router.get("/script/sosAlert", (req, res) => {
    res.sendFile(path.join(__dirname, `../script/sosAlert.js`));
})

router.get("/script/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../script/script.js"));
})


router.get("/script/outOfWebsite", (req, res) => {
    res.sendFile(path.join(__dirname, "../script/outOfWebsite.js"));
})

router.get("/script/sosAlertLocation", (req, res) => {
    res.sendFile(path.join(__dirname, "../script/sosAlertLocation.js"));
})
router.get("/audio/alarm", (req, res) => {
    res.sendFile(path.join(__dirname, "../audio/alarm.mp3"));
})

router.get("/images/blog1", (req, res) => {
    res.sendFile(path.join(__dirname, "../Images/blog1.jpg"));
})

router.get("/images/blog2", (req, res) => {
    res.sendFile(path.join(__dirname, "../Images/blog2.png"));
})

router.get("/images/blog3", (req, res) => {
    res.sendFile(path.join(__dirname, "../Images/blog3.png"));
})

router.get("/images/blog4", (req, res) => {
    res.sendFile(path.join(__dirname, "../Images/blog4.jpg"));
})

router.get("/images/blog5", (req, res) => {
    res.sendFile(path.join(__dirname, "../Images/blog5.png"));
})

router.get("/images/blog6", (req, res) => {
    res.sendFile(path.join(__dirname, "../Images/blog6.jpg"));
})

router.get("/css/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../styles/style.css"));
})


module.exports = router;
