import { Router } from 'express';

import {
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
} from '../controllers/entry.controller';

const router = Router();

router.route('/').post(createEntry);
router.route('/:id').get(getEntry).patch(updateEntry).delete(deleteEntry);

export default router;
