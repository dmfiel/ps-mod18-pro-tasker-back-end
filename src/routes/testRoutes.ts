import express from 'express';
import { getFunFact } from '../controllers/testController';

const router = express.Router();

// GET /
router.get('/', getFunFact);

export default router;
