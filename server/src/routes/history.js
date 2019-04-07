import { Router } from 'express';

const router = Router();

router.get('/show', async (req, res) => {
  const history = await req.context.models.History.find();
  return res.send(history);
});

router.get('/:userId', async (req, res) => {
  await req.context.models.History.find({
    userId: req.params.userId,
  }).then(history => res.json(history))
    .catch(err => res.json(err));
});

router.get('/erase', async (req, res) => {
  req.context.models.History.deleteMany({})
    .then(result => res.status(200).send(result))
    .catch(err => res.send(err));
})
export default router;