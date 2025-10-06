import { Router } from 'express';

import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const router = Router();

router.route('/').post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
