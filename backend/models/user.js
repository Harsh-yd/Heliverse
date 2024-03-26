const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchems = new Schema({
    id: {
        type: Number,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    }, 
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }, 
    avatar: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    available: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const teamSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    members: [userSchems]
  },{ timestamps: true });

const User = mongoose.model('User', userSchems);
const Team = mongoose.model('Team', teamSchema);

module.exports = {User, Team};