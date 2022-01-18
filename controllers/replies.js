const Reply = require('../models/Reply');

const createReply = async (req, res) => {
  const reply = await Reply.create(req.body);
  if (!reply) {
    return res.json({error: 'could not post reply.'})
  }
  return res.send(reply);
}

const getAllReplies = async (req, res) => {
  console.log(req.body);
  return res.json({reply: 'get all replies'});
}

const deleteReply = async (req, res) => {
  return res.json({reply: 'delete reply'});
}

const reportReply = async (req, res) => {
  return res.json({reply: 'report reply'});
}

module.exports = {
  createReply,
  getAllReplies,
  deleteReply,
  reportReply
}