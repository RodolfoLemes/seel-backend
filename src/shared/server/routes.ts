import { Router } from 'express';

import subscriberRoutes from '@modules/subscriber/routes/subscribers.routes';

const router = Router();

router.use('/subscribers', subscriberRoutes);

export default router;
