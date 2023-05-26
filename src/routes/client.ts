import { Router } from 'express';
import { getClients } from '../controllers/client';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getClients)

export default router;