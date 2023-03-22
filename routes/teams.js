var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

//import models
const Team = require("../models/team");
const verifyToken = require("../middleware/verify-token");

//get teams
router.get("/", async function (req, res) {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get team by id
router.get("/:id", async function (req, res) {
    try {
        const team = await Team.findById(req.params.id);
        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//get team by id
router.get("/wallet/:id", async function (req, res) {
    try {
        const team = await Team.findById(req.params.id);
        res.status(200).json({ teamWallet: team.teamWallet });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//new buyer
router.post("/new", async function (req, res) {
    const team = new Team({
        teamName: req.body.teamName,
        teamCode: req.body.teamCode,
        passKey: await bcrypt.hash(req.body.passKey, 10),
        teamWallet: req.body.teamWallet
    });

    try {
        const savedTeam = await team.save();
        res
            .status(200)
            .json({ message: "success", additional_info: "team created" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update a team password
router.patch("/:id/update_password", async function (req, res) {
    try {
        updatedTeam = await Team.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    passKey: await bcrypt.hash(req.body.passKey, 10)
                }
            },
            { runValidators: true }
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "password updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update a team Wallet Amount
router.post("/:id/update_wallet", async function (req, res) {
    try {
        updatedTeam = await Team.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    teamWallet: req.body.teamWallet
                }
            },
            { runValidators: true }
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "Wallet updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete a team
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedTeam = await Team.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "team deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
