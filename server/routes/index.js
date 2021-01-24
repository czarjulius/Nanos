import express from 'express';
import clientRoute from './clientRoute';

const router = express.Router();

router.use('/api/v1', clientRoute);

export default router;