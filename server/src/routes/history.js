import { Router } from 'express';

const router = Router();

router.get('/show', async (req, res) => {
  const history = await req.context.models.History.find();
  return res.send(history); //for debug purposes
});

router.get('/:userId', async (req, res) => {
  await req.context.models.History.find({
    userId: req.params.userId,
  }).then(history => res.json(history))
    .catch(err => res.json(err));
});

router.get('/erase', async (req, res) => {
  req.context.models.History.deleteMany({})
    .then(res => res.status(200).send({"message" : "History has been successfully erased."}))
    .catch(err => res.send({"message" : `An Error occured: {err}`}));
})
export default router;