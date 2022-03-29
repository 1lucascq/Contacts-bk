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
Object.defineProperty(exports, "__esModule", { value: true });
class Contacts {
    constructor(connection) {
        this.connection = connection;
    }
    addPhoneNumber(contactId, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO phone_numbers (contact_id, phone) VALUES (?, ?);`;
                yield this.connection.execute(query, [contactId, phone]);
            }
            catch (err) {
                throw new Error('Erro do servidor na adição de novo telefone.');
            }
        });
    }
    ;
    addContact(name, email, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO contacts (name, email, image) VALUES (?, ?, ?);`;
                const [result] = yield this.connection.execute(query, [name, email, image]);
                const id = result.insertId;
                return { id, name, email, image };
            }
            catch (err) {
                throw new Error('Erro do servidor na adição de novo contato.');
            }
        });
    }
    ;
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM contacts';
                const result = yield this.connection.execute(query);
                const [users] = result;
                return users;
            }
            catch (err) {
                throw new Error('Erro do servidor na requisição getAll do model.');
            }
        });
    }
    getAllPhoneNumbers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM phone_numbers;';
                const result = yield this.connection.execute(query);
                const [phones] = result;
                return phones;
            }
            catch (err) {
                throw new Error('Erro do servidor na requisição do getAllPhoneNumbers do model.');
            }
        });
    }
    ;
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM contacts WHERE id = ?';
                const [result] = yield this.connection.execute(query, [id]);
                const [user] = result;
                if (!result.length)
                    return null;
                return user;
            }
            catch (err) {
                throw new Error('Erro do servidor na requisição getByID do model.');
            }
        });
    }
    ;
    getPhoneNumberById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM phone_numbers WHERE contact_id = ?';
                const [result] = yield this.connection.execute(query, [id]);
                if (!result.length)
                    return null;
                return result;
            }
            catch (err) {
                throw new Error('Erro do servidor na requisição do getPhoneNumberById do model.');
            }
        });
    }
    ;
    // A implementação aqui é de uma tupla, onde o primeiro item é o novo telefone e o segundo o número antigo a ser alterado.
    updatePhoneNumber(contactId, phoneNumbers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (phoneNumbers.length > 1) {
                    const query = 'UPDATE phone_numbers SET phone = ? WHERE contact_id = ? AND phone = ?;';
                    yield this.connection.execute(query, [phoneNumbers[1], contactId, phoneNumbers[0]]);
                    return;
                }
                const query = 'UPDATE phone_numbers SET phone = ? WHERE contact_id = ?;';
                yield this.connection.execute(query, [phoneNumbers[0], contactId]);
                return;
            }
            catch (err) {
                throw new Error('Erro do servidor na atualização de telefone do model.');
            }
        });
    }
    ;
    updateContact(id, name, email, image, phoneNumbers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'UPDATE contacts SET name = ?, email = ?, image = ? WHERE id = ?;';
                yield this.connection.execute(query, [name, email, image, id]);
                yield this.updatePhoneNumber(id, phoneNumbers);
                return null;
            }
            catch (err) {
                throw new Error('Erro do servidor na atualização de contato do model.');
            }
        });
    }
    ;
    exclude(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield this.getById(id);
                if (!contact)
                    throw new Error('404:Id não encontrado! Confira os dados da isição.');
                const queryPhone = 'DELETE FROM phone_numbers WHERE contact_id = ?;';
                const queryContact = 'DELETE FROM contacts WHERE id = ?;';
                yield this.connection.execute(queryPhone, [id]);
                yield this.connection.execute(queryContact, [id]);
                return contact;
            }
            catch (err) {
                throw new Error('Erro do servidor na exclusão de contato do model.');
            }
        });
    }
    ;
}
exports.default = Contacts;
