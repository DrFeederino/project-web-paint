import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const history = await req.context.models.History.find();
  return res.send(history);
});

router.get('/:historyId', async (req, res) => {
  const history = await req.context.models.Message.findById(
    req.params.historyId,
  );
  return res.send(history);
});

router.post('/', async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    user: req.context.me.id,
  });

  return res.send(message);
});

router.delete('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findById(
    req.params.messageId,
  );

  let result = null;
  if (message) {
    result = await message.remove();
  }

  return res.send(result);
});

export default router;