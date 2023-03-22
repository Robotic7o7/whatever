var express = require("express");
var router = express.Router();


//import models
const Bid = require("../models/bid");
const verifyToken = require("../middleware/verify-token");

//get bids
router.get("/", async function (req, res) {
    try {
        const bids = await Bid.find();
        res.status(200).json(bids);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get bid by id
router.get("/:id", async function (req, res) {
    try {
        const bid = await Bid.findById(req.params.id);
        res.status(200).json(bid);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//new bid
router.post("/new", verifyToken, async function (req, res) {

    if (req.auth.team_id) {
        const bid = new Bid({
            teamCode: req.body.teamCode,
            questionNo: req.body.questionNo,
            bidAmount: req.body.bidAmount
        });

        try {
            const savedBid = await bid.save();
            res
                .status(200)
                .json({ message: "success", additional_info: "bid saved" });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }
    else {
        res.status(403).json({ message: 'AUTH_FAILED' })
    }

});



//delete a team
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedBid = await Bid.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "bid deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
