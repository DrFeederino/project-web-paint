var express = require('express');
var router = express.Router();
var db = require('./db');

let users = {
  1: {
    id: '1',
    username: 'f',
  },
  2: {
    id: '2',
    username: 'g',
  },
  3: {
    id: '3',
    username: 'c',
  },
}
let emails = {
  1: {
    id: '1',
    email: 'fagit@mail.com',
  },
  2: {
    id: '2',
    email: 'govno@mail.com',
  },
  3: {
    id: '3',
    email: 'cyka@mail.com',
  }
}

router.get('/', (req, res) => {
  return res.send(Object.values(users));
});
router.get('/:userId', (req, res) => {
  return res.send(users[req.params.userId]);
});

router.post('/', (req, res) => {
  console.log(req);
  return res.send('here is what i get' + req);
});

router.get('/users/:user', (req, res) => {
  return res.send(`get method on user ${req.params.user} resource`);
});

router.get('/users:settings', (req, res) => {
  return res.send('ok');
});

router.delete('/users:user', (req, res) => {
  return res.send('ok');
});

module.exports = router;
