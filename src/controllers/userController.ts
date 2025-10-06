import express from 'express';
import User, { IUser } from '../models/User';
import { signToken } from '../utils/auth';

// POST /api/users/register - Create a new user
export async function registerUser(
  req: express.Request,
  res: express.Response
) {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json(err);
  }
}

// POST /api/users/login - Authenticate a user and return a token
export async function loginUser(req: express.Request, res: express.Response) {
  console.log('Login: ', req.body);
  const user: IUser = await User.findOne({
    email: req.body.email
  });

  if (!user) {
    console.log("Can't find this user");
    return res.status(400).json({ message: "Can't find this user" });
  }

  const correctPw = user.isCorrectPassword(req.body.password);

  if (!correctPw) {
    console.log('Wrong password!');
    return res.status(400).json({ message: 'Wrong password!' });
  }

  const token = signToken(user);
  res.json({ token, user });
}
