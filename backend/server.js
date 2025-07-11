import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import storyRoutes from './routes/story.route.js'; // 👈 this line must exist

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', storyRoutes); // 👈 this line registers /api/story

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
