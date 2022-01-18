const Reply = require('../models/Reply');
const Thread = require('../models/Thread');

const createReply = async (req, res) => {
  const reply = await Reply.create(req.body);
  if (!reply) {
    return res.json({error: 'could not post reply.'})
  }
  return res.send(reply);
}

const getAllReplies = async (req, res) => {
  //console.log(req.params);
  //console.log(req.query);
  const threads = await Thread.find({board: req.params.board});
  //console.log(threads);

  // Find the replies that match the thread id's
  const replyObj = await Reply.find({'thread_id': req.query.thread_id});
  //console.log(replyObj);

  // Merge the data from the two calls to the DB into one 'rep'-ly/response
  var rep = threads.map(t => {
    return ({_id: t._doc._id,
      text: t._doc.text,
      created_on: t._doc.createdAt,
      replies: replyObj
        .filter(o => {
          return o.thread_id.toString() === t._doc._id.toString();
        })
        .map(o => {
          return {_id: o._id, text: o.text, created_on: o.createdAt}
        }),
      replycount: replyObj
        .filter(o => {
          return o.thread_id.toString() === t._doc._id.toString();
        }).length
    });
  });
  return res.send(rep[0]);
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