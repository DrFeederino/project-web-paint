import { Router } from 'express';
import bcrypt from 'bcrypt';

const router = Router();
const saltRounds = 10; // per docs

router.get('/show', async (req, res) => {
  let users = await req.context.models.User.find();
  res.send(users); // to check if everything is fine on server side
});

router.get('/', async (req, res) => { //login users
  let user;
  console.log(req.body)
  await req.context.models.User.findOne({
    username: req.body.username,
  }).then((fetchUser => user = fetchUser))
    .catch(() => res.send('User not found'));
  console.log(user);
  if (user) {
    if (user.password === req.body.password) {
      res.send(user);
    } else { res.send('Password does not match') }
  } else { res.send('User not found')}
});

router.post('/', async (req, res) => { //creates users
  console.log('receieved post from UI');
  console.log(req.body);
  await req.context.models.User.create(req.body, (err, result) => {
    if (err) { res.send(err) }
    res.sendStatus(200);
  });
});

router.delete('/', async (req, res) => { //delets users from db
  await req.context.models.User.deleteOne({
    username: req.body.username,
  }, (err, result) => {
    if (err) { res.send(err) }
    res.sendStatus(200);
  });
});

// userSchema.statics.createUser = async (user) => {
//   this.create(...user, (err) => {
//     if (err) { return err; }
//   });
// };

// userSchema.statics.resetPassword = async (user) => {
// this.update(user, (err) => {
//   if (err) { return err; }
// });
// };
// userSchema.statics.loginUser = async (user) => {
// let userFromDB = await this.findOne({
//   email: user.email,
//   password: user.password,
// });
// return user;
// };

// userSchema.statics.findByLogin = async function(login) {
// let user = await this.findOne({
//   username: login,
// });

// if (!user) {
//   user = await this.findOne({ email: login });
// }
// return user;
// };

export default router;