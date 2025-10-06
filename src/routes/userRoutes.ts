import express from 'express';
import passport from '../config/passport.js';
import { signToken } from '../utils/auth.js';
import { loginUser, registerUser } from '../controllers/userController.js';

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://fiel.us/pro-tasker';
const router = express.Router();

// POST /api/users/register - Create a new user
router.post('/register', registerUser);

// POST /api/users/login - Authenticate a user and return a token
router.post('/login', loginUser);

// GET /api/users/auth/github
// Route to start the OAuth flow
// When a user visits this URL, they will be redirected to GitHub to log in.
router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }) // Request email scope
);

// The callback route that GitHub will redirect to after the user approves.
router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login', // Where to redirect if user denies
    session: false // We are using tokens, not sessions
  }),
  (req: express.Request, res: express.Response) => {
    // At this point, `req.user` is the user profile returned from the verify callback.
    // We can now issue our own JWT to the user.
    const token = signToken(req.user);
    // Redirect the user to the frontend with the token, or send it in the response
    console.log(`Redirecting to ${FRONTEND_URL}?token=${token}`);
    res.redirect(`${FRONTEND_URL}?token=${token}`);
  }
);

export default router;
