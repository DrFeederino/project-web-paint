import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import History from '../models/history.model';
import Response from '../response';

const router = Router();
const saltRounds = 10; 
const messages = {
  "empty_request": "Received an empty request.",
  "user_not_found": "User has not been found.",
  "bad_request": "Received a bad request.",
  "bad_update_request": "Received a bad update request.",
  "user_deleted": "User is successfully deleted.",
  "user_not_deleted": "Unable to delete user.",
  "user_not_created": "Cannot add user.",
  "user_updated": "User settings were successfully updated.",
  "bad_password": "Password does not match.",
  "internal_error": "Internal error has occured.",
  "history_not_deleted": "Failed to erase user's history.",
  "history_deleted": "User's history is deleted."
};


//res.status(200).redirect(`/users/${newUser._id}`)
async function handleCreateUser (userdata) {
  const password = await bcrypt.hash(userdata.password, saltRounds);
  const user = {
     username: userdata.username,
     email: userdata.email,
     password: password,
     timestamp: new Date(),
  };
  const data = userdata.data;
  const newUser = new User(user);
  if (newUser) {
    newUser.save();
    logHistory(newUser._id, data);
    return new Response(200, newUser._id);
  }
  return new Response(400, messages.user_not_created);
}

async function handleLoginUser(userdata) {
  const data = userdata.data;
  try {
    const userFromDb = await User.findOne({
      email: userdata.email,
    });
    const matchingPasswords = await bcrypt.compare(userdata.password, userFromDb.password);
    if (matchingPasswords) {
      logHistory(userFromDb._id, data);
      return new Response(200, userFromDb);
    } else {
      return new Response(401, messages.bad_password);
    }
  } catch(e) {
    console.log(e);
    return new Response(404, messages.user_not_found);
  }
}

async function handleFetchUserInfo(id) {
  const user = await User.findOne({
    _id: id,
  });
  if (user) {
    return new Response(200, user);
  } else {
    return new Response(404, messages.user_not_found);
  }
}

async function handleShowUsers() {
  try {
    const users = await User.find();
    return new Response(200, users);
  } catch (e) {
    console.log(e);
    return new Response(500, messages.internal_error);
  }
}

async function handleDeleteUser(id) {
  const user = await User.deleteOne({
    _id: id
  });
  if (user.n > 0) {
    deleteUserInfo(id);
    return new Response(200, messages.user_deleted);
  } else {
    return new Response(404, messages.user_not_deleted);
  }
}

async function deleteUserInfo(id) {
  console.log('deleted')
  await History.deleteMany({ userId : id});
}
function logHistory(id, data) {
  const history = new History({
    userId: id,
    timestamp: new Date(),
    action: data.action,
    useragent: data.useragent,
  });
  history.save();
}

async function handleUpdateUserInfo(id, dataToUpdate) {
  const user = await User.findOne({
    _id: id
  });
  if (user) {
    console.log(user);
    updateUser(user, dataToUpdate);
    return new Response(200, user);
  } else {
    return new Response(404, messages.user_not_found);
  }
}

function updateUser(user, data) {
  user.username = data.username || user.username;
  user.email = data.email || user.email;
  user.password = data.password || user.password;
  user.save();
}

/*
 * General Users operations
 */

router.get('/show', async (req, res) => {
  const response = await handleShowUsers();
  res.status(response.status).send(response.body);
});

router.post('/login', async (req, res) => {
  const response = await handleLoginUser(req.body);
  console.log(response);
  res.status(response.status).send(response.body);
});

router.post('/create', async (req, res) => {
  const response = await handleCreateUser(req.body);
  res.status(response.status).send(response.body);
});

/*
 * User specific operations 
 */

router.get('/:userId', async (req, res) => {
  const response = await handleFetchUserInfo(req.params.userId);
  res.status(response.status).send(response.body);
});

router.put('/:userId/update', async (req, res) => {
  const response = await handleUpdateUserInfo(req.params.userId, req.body);
  res.status(response.status).send(response.body);
});

router.delete('/:userId/delete', async (req, res) => { 
  const response = await handleDeleteUser(req.params.userId);
  res.status(response.status).send(response.body);
});

export default router;