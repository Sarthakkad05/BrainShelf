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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./auth");
const db_1 = require("./db");
const utils_1 = require("./utils");
mongoose_1.default.connect("mongodb+srv://Sarthakkad14:sfwsQ-Kh_VW7pif@cluster0.nel8j.mongodb.net/secondBrain");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const userProfileSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "Username must be at least 3 characters long")
        .max(10, "Username must not be more than 10 characters long"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long")
        .max(20)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character")
});
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = userProfileSchema.safeParse(req.body);
    const updatedBody = req.body;
    if (!parsed.success) {
        res.status(411).json({ msg: "Error in inputs" });
        return;
    }
    try {
        const existingUser = yield db_1.UserModel.findOne({ username: updatedBody.username });
        if (!existingUser) {
            yield db_1.UserModel.create(updatedBody);
            res.status(200).json({ msg: "Signed up" });
        }
        else {
            res.status(403).json({ msg: "User already exists with this username" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBody = req.body;
    try {
        const user = yield db_1.UserModel.findOne({
            username: updatedBody.username,
            password: updatedBody.password
        });
        if (!user) {
            res.status(403).json({ msg: "Wrong username or password" });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, auth_1.JWT_SECRET);
            res.json({ token });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
app.post("/api/v1/content", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, link, type, tagTitles } = req.body;
        const userId = req.userId;
        if (!Array.isArray(tagTitles)) {
            res.status(400).json({ error: "tagTitles should be an array of strings." });
            return;
        }
        // 1. Find or create tags by title
        const tagIds = [];
        for (const tagTitle of tagTitles) {
            const trimmedTitle = tagTitle.trim();
            if (!trimmedTitle)
                continue;
            let tag = yield db_1.TagModel.findOne({ title: trimmedTitle });
            if (!tag) {
                tag = yield db_1.TagModel.create({ title: trimmedTitle });
            }
            tagIds.push(tag._id);
        }
        const content = yield db_1.ContentModel.create({
            type,
            link,
            title,
            userId,
            tags: tagIds
        });
        res.status(201).json({ message: "Content created successfully", content });
    }
    catch (error) {
        console.error("Error creating content:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get('/api/v1/content', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield db_1.ContentModel.find({ userId: req.userId }).populate("tags").populate("userId", "username");
    res.json({ content });
}));
app.delete('/api/v1/content', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteMany({ _id: contentId, userId: req.userId });
    res.json({ message: "Deleted" });
}));
app.post('/api/v1/brain/share', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
        return;
    }
    else {
        yield db_1.LinkModel.deleteOne({ userId: req.userId });
        res.json({
            msg: "Share link deleted successfully"
        });
        return;
    }
}));
app.delete('/api/v1/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    res.json({ msg: `You accessed shared link: ${hash}` });
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
