"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
function ErrorHandler(err, req, res, _next) {
    if (err.isJoi) {
        console.log(req.body);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: { message: err.details[0].message } });
    }
    const status = +err.message.slice(0, 3);
    if (status > 100 && status < 600) {
        return res.status(+err.message.slice(0, 3)).json({ message: err.message.slice(4) });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message
    });
}
exports.default = ErrorHandler;
;
