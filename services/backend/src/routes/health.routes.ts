import { Router } from 'express';
import getHealthHandler from '../controllers/health.controller';

const router = Router();

router.get('/', getHealthHandler);

export default router;
