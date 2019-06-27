import { Router } from 'express';
import History from '../models/history.model';
import Response from '../response';

const router = Router();
const messages = {
  "history_deleted": "History has been successfully deleted.",
  "history_not_deleted": "History was not deleted.",
  "history_not_fetched": "Failed to fetch history from database."
};

async function handleShowHistory() {
  const history = await History.find();
  if (history) {
    return new Response(200, history);
  } else {
    return new Response(500, messages.history_not_deleted);
  }
}

async function handleShowUserHistory(id) {
  const userHistory = await History.find({
    userId: id
  });
  if (userHistory) {
    return new Response(200, userHistory);
  } else {
    return new Response(500, messages.history_not_fetched);
  }
}

async function handleEraseHistory() {
  const history = await History.deleteMany({});
  if (history.ok) {
    return new Response(200, messages.history_deleted);
  } else {
    return new Response(500, messages.history_not_deleted);
  }
}

router.get('/show', async (req, res) => {
  const response = await handleShowHistory();
  res.status(response.status).send(response.body);
});

router.get('/:userId', async (req, res) => {
  const response = await handleShowUserHistory(req.params.userId);
  res.status(response.status).send(response.body);
});

router.delete('/erase', async (req, res) => {
  const response = await handleEraseHistory();
  res.status(response.status).send(response.body);
});

export default router;