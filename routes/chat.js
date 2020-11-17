var express = require("express");
var router = express.Router();
require("dotenv").config();
var models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1108081",
  key: "2985b7ef897701726d64",
  secret: "11dbeb549e59bd3fae6e",
  cluster: "eu",
  useTLS: true,
});

router.post("/:sender_id/:receiver_id", (req, res) => {
  let { sender_id, receiver_id } = req.params;
  let text = req.body.data.message;

  //store in database

  try {
    models.Message.create({ text, sender_id, receiver_id });
  } catch (err) {
    res.status(500).send(err);
  }

  const ids = [sender_id, receiver_id].sort();
  let channel = `chat-${ids[0]}-${ids[1]}`;

  //Your code to trigger an event to Pusher here

  pusher.trigger(channel, "message", {
    sender_id,
    receiver_id,
    text,
  });

  res.send({ msg: "Sent" });
});

router.get("/:id1/:id2", async (req, res) => {
  let { id1, id2 } = req.params;
  let messages = await models.Message.findAll({
    where: {
      sender_id: {
        [Op.in]: [id1, id2],
      },
      receiver_id: {
        [Op.in]: [id1, id2],
      },
    },
    include: ["sender", "receiver"],
    limit: 10,
    order: [["id", "DESC"]],
  });

  res.send(messages.reverse());
});

module.exports = router;
