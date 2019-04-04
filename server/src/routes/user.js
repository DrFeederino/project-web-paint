import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  await req.context.models.User.findById(
    req.params.userId,
  );
  res.sendStatus(200);
});

router.post('/:userId', async (req, res) => {
  await req.context.models.User.create(
    req.params.body,
  );
  res.sendStatus(200);
});

router.delete('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId);
  let result = null;
  if (user) { user.remove()}
  return res.send(result);
})
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