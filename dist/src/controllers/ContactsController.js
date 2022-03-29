"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const ContactsServices_1 = __importDefault(require("../services/ContactsServices"));
class UserController {
    constructor(contactsService = new ContactsServices_1.default()) {
        this.contactsService = contactsService;
        this.getAll = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield this.contactsService.getAllContacts();
                return res.status(http_status_codes_1.StatusCodes.OK).json(contacts);
            }
            catch (err) {
                next(err);
            }
        });
        this.getById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield this.contactsService.getById(+req.params.id);
                if (contact === null) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'The refereed ID doesn\'t exist!' });
                }
                return res.status(200).json(contact);
            }
            catch (err) {
                next(err);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { name, email, image, phoneNumbers } = req.body;
                const newContact = yield this.contactsService.add({ name, email, image, phoneNumbers });
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(newContact);
            }
            catch (err) {
                next(err);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Cont.update: ', req.body);
                const { name, email, image, phoneNumbers } = req.body;
                const contact = yield this.contactsService.update(+req.params.id, name, email, image, phoneNumbers);
                return res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Contact updated!' });
            }
            catch (err) {
                next(err);
            }
        });
        this.destroy = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield this.contactsService.exclude(+req.params.id);
                if (contact === null) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'The refereed ID doesn\'t exist!' });
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Contact deleted!' });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = UserController;
