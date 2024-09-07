const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

router.get("/images/:slug", (req, res) => {
    res.sendFile(path.join(__dirname, `../Images/Womens-Safety-in-India.png`));
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
module.exports = router;