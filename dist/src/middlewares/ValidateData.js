"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function ValidateData(req, _res, next) {
    const { name, email, image, phoneNumbers } = req.body;
    const { error } = joi_1.default.object({
        name: joi_1.default.string().not().empty().required(),
        email: joi_1.default.string().not().empty().required(),
        image: joi_1.default.string().not().empty().required(),
    })
        .validate({ name, email, image });
    if (error) {
        return next(error);
    }
    next();
}
exports.default = ValidateData;
;
