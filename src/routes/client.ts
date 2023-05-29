import { Router } from 'express';
import { getClients } from '../controllers/client';
import validateToken from '../middlewares/validate-token';
import adminAuthMiddleware from '../middlewares/service-auth';

const router = Router();

router.get('/',validateToken, adminAuthMiddleware, getClients)

export default router;