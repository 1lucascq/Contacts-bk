import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ContactsService from '../services/ContactsServices';
import { IContact } from '../interfaces';
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
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'The refereed ID doesn\'t exist!' });
      }
      return res.status(200).json(contact);
    } catch (err) {
      next(err)
    }  
  };


  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const { name, email, image, phoneNumbers } = req.body as IContact;
      const newContact: IContact = await this.contactsService.add({ name, email, image, phoneNumbers });
      return res.status(StatusCodes.CREATED).json(newContact);
    } catch (err) {
      next(err)
    }  
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const { name, email, image, phoneNumbers } = req.body as IContact;
      const contact: IContact = await this.contactsService.update(+req.params.id, name, email, image, phoneNumbers);
      return res.status(StatusCodes.OK).json(contact);
    } catch (err) {
      next(err)
    }  
  };

  public destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contact: IContact | null = await this.contactsService.exclude(+req.params.id);
      if (contact === null) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'The refereed ID doesn\'t exist!' });
      }
      
      return res.status(StatusCodes.OK).json({ message: 'Contact deleted!'});
    } catch (err) {
      next(err)
    }  
  };
}
