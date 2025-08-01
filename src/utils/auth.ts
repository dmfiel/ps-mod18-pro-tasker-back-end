import jwt from 'jsonwebtoken';
import express from 'express';

const secret = process.env.JWT_SECRET;
const expiration = '24h';

export function authMiddleware(
  req: express.Request,
  res: express.Response,
  next
) {
  let token = req.headers.authorization || req.body?.token || req.query?.token;

  if (token) {
    token = token.split(' ').pop().trim();
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to do that.' });
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch (error) {
    console.log('Invalid token', error);
    return res.status(401).json({ message: 'Invalid token.' });
  }

  next();
}

export function signToken({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
