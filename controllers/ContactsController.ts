import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ContactsService from '../services/ContactsServices';
import { IContact, IContactModel } from '../interfaces';
export default class UserController {
  constructor(private contactsService = new ContactsService()) { }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const contacts: IContact[] = await this.contactsService.getAllContacts();
      return res.status(StatusCodes.OK).json(contacts);    
    } catch (err) {
      next(err)
    }  
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contact: IContact | null = await this.contactsService.getById(+req.params.id);
      if (contact === null) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Confira o Id solicitado!' });
      }
      return res.status(200).json(contact);
    } catch (err) {
      next(err)
    }  
  };


  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, image, phone } = req.body as IContactModel;
      const newContact: IContactModel = await this.contactsService.add({ name, email, image, phone });
      return res.status(StatusCodes.CREATED).json(newContact);
    } catch (err) {
      next(err)
    }  
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, image, phone } = req.body as IContactModel;
      const contact: IContactModel = await this.contactsService.update(+req.params.id, name, email, image, phone);
      return res.status(StatusCodes.OK).json(contact);
    } catch (err) {
      next(err)
    }  
  };

  public destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contact: IContactModel | null = await this.contactsService.exclude(+req.params.id);
      if (contact === null) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Confira o Id solicitado!' });
      }
      
      return res.status(StatusCodes.OK).json({ message: 'Contato deletado!'});
    } catch (err) {
      next(err)
    }  
  };
}

// const express = require('express');
// const { ValidateData } = require('../middlewares/ValidateData');
// const this.contactsService = require('../services/this.contactsService');

// const router = express.Router();

// router.get('/', async (_req, res, next) => {
//   try {
//     const contacts = await this.contactsService.getAll();
//     return res.status(200).json(contacts);    
//   } catch (err) {
//     next(err)
//   }
// });

// router.get('/:id', async (req, res, next) => {
//   try {
//     const contact = await this.contactsService.getById(req.params.id);
//     return res.status(200).json(contact);
//   } catch (err) {
//     next(err)
//   }
// });

// router.post('/', ValidateData, async (req, res, next) => {
//   try {
//     const { name, email, image, phone } = req.body;
//     const newContact = await this.contactsService.add({ name, email, image, phone });
//     return res.status(201).json(newContact);
//   } catch (err) {
//     return next(err)
//   }
// });

// router.put('/:id', ValidateData, async (req, res, next) => {
//   try {
//     const { name, email, image, phone } = req.body;
//     const contact = await this.contactsService.update(req.params.id, name, email, image, phone);
//     return res.status(200).json(contact);
//   } catch (err) {
//     return next(err)
//   }
// });

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const contact = await this.contactsService.exclude(req.params.id);
//     return res.status(200).json(contact);    
//   } catch (err) {
//     return next(err)
//   }
// });

// module.exports = router;
