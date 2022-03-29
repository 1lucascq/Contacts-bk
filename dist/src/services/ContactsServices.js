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
const ContactsModel_1 = __importDefault(require("../models/ContactsModel"));
const connection_1 = __importDefault(require("../models/connection"));
class ContactsService {
    constructor() {
        this.ContactsModel = new ContactsModel_1.default(connection_1.default);
    }
    addPhones(id, phoneNumbers) {
        return __awaiter(this, void 0, void 0, function* () {
            phoneNumbers.forEach(phone => this.ContactsModel.addPhoneNumber(id, phone));
        });
    }
    getPhoneNumbers(id, phoneNumbers) {
        return phoneNumbers.filter(({ contact_id }) => contact_id === id).map(({ phone }) => phone);
    }
    ;
    preventDuplications(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const allContacts = yield this.getAllContacts();
            const nameAlreadyExists = allContacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
            if (nameAlreadyExists)
                throw new Error('409:You already have a contact with this name!');
            const emailAlreadyExists = allContacts.find((contact) => contact.email.toLowerCase() === email.toLowerCase());
            if (emailAlreadyExists)
                throw new Error('409:You already have a contact with this email!');
            return true;
        });
    }
    getAllContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield this.ContactsModel.getAll();
                const phoneNumbers = yield this.ContactsModel.getAllPhoneNumbers();
                const fullData = contacts.map((cont) => (Object.assign(Object.assign({}, cont), { phoneNumbers: this.getPhoneNumbers(cont.id, phoneNumbers) })));
                return fullData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield this.ContactsModel.getById(id);
                if (!contact)
                    return null;
                const phoneNumbers = yield this.ContactsModel.getPhoneNumberById(id);
                if (!phoneNumbers)
                    return null;
                const fullData = Object.assign(Object.assign({}, contact), { phoneNumbers: phoneNumbers.map(({ phone }) => phone) });
                return fullData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    add(contactToAdd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, image, phoneNumbers } = contactToAdd;
                yield this.preventDuplications(name, email);
                const addContactRes = yield this.ContactsModel.addContact(name, email, image);
                this.addPhones(addContactRes.id, phoneNumbers);
                return Object.assign(Object.assign({}, addContactRes), { phoneNumbers });
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
    update(id, name, email, image, phoneNumbers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Serv.update: ', id, name, email, image, phoneNumbers);
                yield this.ContactsModel.updateContact(id, name, email, image, phoneNumbers);
                const result = yield this.getById(id);
                if (!result)
                    throw new Error('O contato informado para update não existe no banco de dados');
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    exclude(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield this.ContactsModel.getById(id);
                if (!contact)
                    return null;
                return yield this.ContactsModel.exclude(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ContactsService;
