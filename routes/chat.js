const express = require('express');
const router = express.Router();


// create chat
router.post("/", (req, res) => {})

//get all chats
router.get("/all", (req, res) => {})

// get chat by id
router.get("/:id", (req, res) => {})

// update chat
router.put("/:id", (req, res) => {})


module.exports = router;