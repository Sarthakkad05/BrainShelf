# BrainShelf

BrainShelf is a personal knowledge organizer — your digital second brain. Save, tag, and manage content like YouTube videos, tweets, documents, images, and links in one place. Easily organize your resources with custom tags, and share your collection when needed.

## Features

- Save links from YouTube, Twitter, web, documents, and images
- Add multiple custom tags for better categorization
- Search by title or tags (coming soon)
- Share your "BrainShelf" via unique public link
- Light/Dark mode support
- JWT-based authentication
- Built for creators, learners, and lifelong knowledge hoarders

## Tech Stack

### Frontend
- React.js + TypeScript
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js + Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Zod for validation

## Local Development

```bash
git clone https://github.com/Sarthakkad05/BrainShelf.git
cd BrainShelf

MONGODB_URI=mongodb+srv://your-user:your-pass@cluster.mongodb.net/BrainShelf
JWT_SECRET=your_jwt_secret

cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev

