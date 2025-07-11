// routes/story.route.js
import express from 'express';
import multer from 'multer';
import { generateStory } from '../controllers/storyGenerator.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/story', upload.single('image'), generateStory);

export default router;
