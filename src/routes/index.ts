import { Router } from 'express';
import ContactsRouter from './contacts';

const router = Router();

router.use('/contacts', ContactsRouter);

export default router;