import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { z } from "zod";
import jwt from "jsonwebtoken";
import cors from "cors";

import { authMiddleware, JWT_SECRET } from './auth';
import { ContentModel, LinkModel, TagModel, UserModel } from './db';
import { random } from './utils';

interface RequestWithUserId extends Request {
  userId?: string;
}

mongoose.connect("mongodb+srv://Sarthakkad14:sfwsQ-Kh_VW7pif@cluster0.nel8j.mongodb.net/secondBrain");

const app = express();
app.use(express.json());
app.use(cors());
 
const userProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),

  password: z.string().min(8, "Password must be at least 8 characters long")
    .max(20)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character")
});

type FinalUserSchema = z.infer<typeof userProfileSchema>;

app.post('/api/v1/signup', async (req: Request, res: Response) => {
  const parsed = userProfileSchema.safeParse(req.body);
  const updatedBody: FinalUserSchema = req.body;

  if (!parsed.success) {
    res.status(411).json({ msg: "Error in inputs" });
    return;
  }   

  try {
    const existingUser = await UserModel.findOne({ username: updatedBody.username });
    if (!existingUser) {
      const user = await UserModel.create(updatedBody);
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      
    res.status(200).json({ msg: "Signed up", token });
    } else {
      res.status(403).json({ msg: "User already exists with this username" });
    }

  } catch (error) {
    res.status(500).json(error);
  }
});

app.post('/api/v1/signin', async (req: Request, res: Response) => {
  const updatedBody: FinalUserSchema = req.body;

  try {
    const user = await UserModel.findOne({
      username: updatedBody.username,
      password: updatedBody.password
    });

    if (!user) {
      res.status(403).json({ msg: "Wrong username or password" });
    } else {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.json({ token });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/api/v1/content", authMiddleware, async (req: RequestWithUserId, res: Response) => {
  
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
      if (!trimmedTitle) continue;

      let tag = await TagModel.findOne({ title: trimmedTitle });

      if (!tag) {
        tag = await TagModel.create({ title: trimmedTitle });
      }

      tagIds.push(tag._id);
    }

    const content = await ContentModel.create({
      type,
      link,
      title,
      userId,
      tags: tagIds
    });
    res.status(201).json({ message: "Content created successfully", content });
  } catch (error) {
     console.error("Error creating content:", error); 
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/v1/content', authMiddleware, async (req: RequestWithUserId, res: Response) => {
  const { search } = req.query;
  const userId = req.userId;

  let query: any = { userId };

  if (search) {
    const regex = new RegExp(search as string, 'i'); // case-insensitive
    query = {
      userId,
      $or: [
        { title: regex },
        // Match by tag title (requires .populate and post-filter)
      ]
    };
  }

  let contents = await ContentModel.find(query).populate("tags").populate("userId", "username");

  // Additional filter for tags if search is used
  if (search) {
    const searchStr = (search as string).toLowerCase();
    contents = contents.filter(content =>
    (content.tags as unknown as { title: string }[]).some(tag =>
      tag.title.toLowerCase().includes(searchStr)
    ) ||
      content.title.toLowerCase().includes(searchStr)
    );
  }

  res.json({ content: contents });
}); 

app.delete('/api/v1/content', authMiddleware, async (req: RequestWithUserId, res: Response) => {
  const contentId = req.body.contentId;
  await ContentModel.deleteMany({ _id: contentId, userId: req.userId });
  res.json({ message: "Deleted" });
});

app.post('/api/v1/brain/share', authMiddleware, async (req: RequestWithUserId, res: Response) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.userId
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash
      });
      return;
    }

    const hash = random(10);
    await LinkModel.create({
      userId: req.userId,
      hash: hash
    });

    res.json({
      hash
    });
    return;

  } else {
    await LinkModel.deleteOne({ userId: req.userId });

    res.json({
      msg: "Share link deleted successfully"
    });
    return;
  }
});

app.delete('/api/v1/brain/:shareLink', async (req: Request, res: Response) => {
  const hash = req.params.shareLink;
  res.json({ msg: `You accessed shared link: ${hash}` });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
