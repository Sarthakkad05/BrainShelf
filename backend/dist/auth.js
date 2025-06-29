"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.JWT_SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_SECRET = "Sarthakkad@07";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(403).json({ msg: "No authorization header" });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(403).json({ msg: "Invalid token format" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, exports.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        res.status(403).json({ msg: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
