const express = require('express');
const router = express.Router();


router.get("/", function (req, res, next) {
    res.send("node js restful api get method api")
});


router.post("/add-category", function (req, res, next) {
    res.send("node js restful api post method api")
});

router.put("/add-update-category/:id", function (req, res, next) {
    res.send("node js restful api put method api")
});

router.patch("/update-category/:id", function (req, res, next) {
    res.send("node js restful api patch method api")
});

router.delete("/delete-category:/", function (req, res, next) {
    res.send("node js restful api delete method api")
});


module.exports = router;
