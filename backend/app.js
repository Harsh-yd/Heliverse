require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const { User, Team } = require('./models/user')
const cors = require('cors');

//express app
const app = express();
app.use(express.json());
app.use(cors());


// connect to mongodb
const dbURI = process.env.DB;

const port = process.env.PORT || 3000;

mongoose.connect(dbURI)
  .then((res) => {
    console.log('connected to db..');
    app.listen(port);
  })
  .catch(err => console.log(err))





// CRUD Operations

app.get('/api/users', async (req, res) => {

  try {

    const page = parseInt(req.query.page) - 1 || 0;
    const { domain, available, gender, search } = req.query;
    const limit = parseInt(req.query.limit) || 15;

    let filter = {};
    if (domain) filter.domain = domain;
    if (available) filter.available = available;
    if (gender) filter.gender = gender;
    if (search) filter.first_name = { $regex: search, $options: "i" };

    const userArr = await User.find(filter)
      .skip(page * limit)
      .limit(limit);

    const total = await User.countDocuments(filter);

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      userArr,
    };

    res.status(200).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
})

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  User.findOne({ id })
    .then(result => res.send(result))
    .catch(err => console.log(err));
})

app.post('/api/users', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(result => {
      res.status(200).redirect('/');
    })
    .catch(error => {

      if (error.name === 'ValidationError') {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
})

app.delete('/api/users/:id', (req, res) => {
  const Id = req.params.id;
  // console.log(Id);

  User.findByIdAndDelete(Id)
    .then(result => {
      res.json({ redirect: '/' })
    })
    .catch(err => console.log(err));

})

app.delete('/api/team/:id', (req, res) => {
  const Id = req.params.id;
  Team.findByIdAndDelete(Id)
    .then(result => {
      res.json({ redirect: '/team' })
    })
    .catch(err => console.log(err));
})

app.get('/api/team', async (req, res) => {
  try {
    // Return all teams data
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/api/team', async (req, res) => {
  const { name, teamList } = req.body;
  console.log('team post req came', req.body);

  const newTeam = new Team({
    name: name,
    members: teamList
  });

  console.log(newTeam);

  try {
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    console.error('Error saving team to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})