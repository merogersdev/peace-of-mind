import { Router } from 'express';

import {
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
} from '../controllers/habit.controller';

const router = Router();

router.route('/').post(createHabit);
router.route('/:id').get(getHabit).patch(updateHabit).delete(deleteHabit);

export default router;
