"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContactsController_1 = __importDefault(require("../controllers/ContactsController"));
const ValidateData_1 = __importDefault(require("../middlewares/ValidateData"));
const router = (0, express_1.Router)();
const contactsController = new ContactsController_1.default();
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getById);
router.post('/', ValidateData_1.default, contactsController.create);
router.put('/:id', ValidateData_1.default, contactsController.update);
router.delete('/:id', contactsController.destroy);
exports.default = router;
