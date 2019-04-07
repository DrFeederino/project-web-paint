import { Router } from 'express';
//import bcrypt from 'bcrypt';

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
  console.log('Получен запрос на вход пользователя...');
  await req.context.models.User.findOne({
    email: req.body.email,
    password: req.body.password,
  }).then(fetchUser => {
    console.log("Вход пользователя "+ fetchUser.email + " в " + new Date());
    const data = new req.context.models.History({
        loginDate: req.body.data.date,
        action: req.body.data.action,
        os: req.body.data.os,
        device: req.body.data.ua,
        ip: req.ip,
        userId: fetchUser._id,
    })
    console.log(fetchUser);
    res.json(fetchUser);
  }).catch(() => res.status(401).json({err: 'Введены неверно данные.'}));
});

router.post('/create', async (req, res) => { //creates users
  console.log('Получен запрос на регистрацию...');
  let user = await req.context.models.User.findOne({
    email: req.body.email,
  });
  console.log(user);
  if (!user) {
    await req.context.models.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }, (err, result) => {
      if (err) { res.json('Ошибка регистрации'); }
      console.log(req.body.data);
      const data = new req.context.models.History({
        loginDate: req.body.date,
        action: req.body.data.action,
        os: req.body.data.os,
        device: req.body.data.ua,
        ip: req.ip,
        userId: result._id,
      });
      data.save((err) => {
        console.log(err);
      })
      console.log('Регистрация успешно выполнена!');
      console.log(result);
      res.redirect(`/users/${result._id}`);
    });
  } else {
    console.log('Пользователь имеется в БД.');
    res.sendStatus(403);
  }
});

router.get('/:userId', async (req, res) => {
  console.log('Получен переход от регистрации...');
  await req.context.models.User.findOne({
    _id: req.params.userId,
  }, (err, result) => {
    if (err) { res.json('Ошибка получения данных пользователя!') }
    console.log('Выдача данных пользователя.');
    console.log(result);
    res.json(result);
  });
});

router.put('/:userId/update', async (req, res) => {
  console.log('Получен запрос на обновление данных...');
  let user = await req.context.models.User.findOne({
    _id: req.params.userId,
  });
  if (user) {
    console.log(user);
    user = req.body;
    await user.save();
  }
});

router.delete('/:userId/delete', async (req, res) => { //delets users from db
  console.log('Получен запрос на удаление...');
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
    console.log('Невозможно удалить пользователя.');
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