import { Router } from 'express';
import { ContactsController } from '../controllers/ContactsController';

const router = Router();

const contactsController = new ContactsController();

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getById);
router.post('/', ValidateData, contactsController.create);
router.put('/:id', ValidateData, contactsController.update);
router.delete('/:id', contactsController.remove);



export default router;