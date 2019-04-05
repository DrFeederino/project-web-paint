import { Router } from 'express';
import bcrypt from 'bcrypt';

const router = Router();
const saltRounds = 10; // per docs

router.get('/show', async (req, res) => {
  let users = await req.context.models.User.find();
  res.send(users); // to check if everything is fine on server side
});

router.get('/', async (req, res) => {
  res.sendStatus(200);
});

router.post('/login', async (req, res) => { //login users
  let user;
  console.log(req.body)
  
  await req.context.models.User.findOne({
    email: req.body.email,
    password: req.body.password,
  }).then(fetchUser => {
    console.log("Вход пользователя "+ fetchUser.email + " в " + new Date());
    res.json(fetchUser);
  }).catch(() => res.sendStatus(401));
//   console.log(user);
//   if (user) {
//     if (user.password === req.body.password) {
//       console.log(user);
//       res.send(user);
//     } else { res.send('Password does not match') }
//   } else { res.send('User not found')}
});

router.post('/create', async (req, res) => { //creates users
  console.log('Получен запрос на регистрацию...');
  let user = await req.context.models.User.findOne({
    email: req.body.email,
  });
  console.log(user);
  if (!user) {
    await req.context.models.User.create(req.body, (err, result) => {
      if (err) { res.json('Ошибка регистрации') }
      console.log('Регистрация успешно выполнена!')
      console.log(result);
      res.redirect(`/users/${result._id}`);
    });
  } else {
    console.log('Пользователь имеется в БД.')
    res.json('Пользователь зарегестрирован.');
  }
});

router.get('/:userId', async (req, res) => {
  console.log('Получен переход от регистрации...')
  await req.context.models.User.findOne({
    _id: req.params.userId,
  }, (err, result) => {
    if (err) { res.json('Ошибка получения данных пользователя!') }
    console.log('Выдача данных пользователя.');
    console.log(result);
    res.json(result);
  })
});

router.delete('/:userId/delete', async (req, res) => { //delets users from db
  console.log('Получен запрос на удаление...')
  let user = await req.context.models.User.findOne({
    _id: req.params.userId,
  });
  console.log(user);
  if (user) {
    await req.context.models.User.deleteOne(user, (err, result) => {
      if (err) { res.send(err) }
      console.log('Пользователь успешно удалён из системы!');
      res.sendStatus(200);
    });
  } else {
    console.log('Невозможно удалить пользователя.')
    res.sendStatus(401);
  }
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