"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.TagModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Types } = mongoose_1.default;
const User = new Schema({
    username: { type: String, unique: true },
    password: { type: String },
});
const Content = new Schema({
    link: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'tags' }],
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }
});
const Tag = new Schema({
    title: { type: String, required: true }
});
const Link = new Schema({
    hash: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true }
});
const UserModel = mongoose_1.default.model('users', User);
exports.UserModel = UserModel;
const ContentModel = mongoose_1.default.model('contents', Content);
exports.ContentModel = ContentModel;
const TagModel = mongoose_1.default.model('tags', Tag);
exports.TagModel = TagModel;
const LinkModel = mongoose_1.default.model('links', Link);
exports.LinkModel = LinkModel;
