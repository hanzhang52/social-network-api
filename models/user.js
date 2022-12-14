const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Bonus
UserSchema.pre(
  'findOneAndDelete',
  { document: false, query: true },
  async function () {
    console.log('User pre-delete');
    const doc = await this.model.findOne(this.getFilter());
    console.log(doc.username);
    await Thought.deleteMany({ username: doc.username });
  }
);

const User = model('User', UserSchema);

module.exports = User;
