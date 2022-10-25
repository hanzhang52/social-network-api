const { Thoughts, User } = require('../models');

const thoughtsController = {
  // Get all thought
  getAllThoughts(req, res) {
    Thoughts.find({})
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => res.json(err));
  },

  // Get one thought by ID
  getthoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thoughts found with that id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // Create a new thought
  createThought({ body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with that id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // Update a thought by ID
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with that id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // Delete a thought by ID
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with that id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // Create a reaction
  createReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with that id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // Delete a reaction
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;
