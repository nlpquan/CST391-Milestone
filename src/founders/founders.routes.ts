import { Router } from 'express';
import * as ArtistsController from './founders.controller';

const router = Router();
router
.route('/founders')
.get(ArtistsController.readFounders);

export default router;