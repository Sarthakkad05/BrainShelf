
import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const User = new Schema({
    username: { type: String, unique: true },
    password: { type: String},
})

const Content = new Schema({
    link: { type: String, required: true },
    title: { type: String, required: true },
    type:{type: String, required: true},
    tags: [{ type: Schema.Types.ObjectId, ref: 'tags' }], 
    userId: { type: Schema.Types.ObjectId, ref: 'users' , required: true} 
});

const Tag = new Schema({
    title: { type: String , required: true}
})

const Link = new Schema({
    hash:{ type: String , required: true},
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true , unique: true }
})

const UserModel = mongoose.model('users',User);
const ContentModel = mongoose.model('contents',Content);
const TagModel = mongoose.model('tags',Tag);
const LinkModel = mongoose.model('links',Link);


export { UserModel, ContentModel, TagModel, LinkModel };