// server/controllers/storyGenerator.js
import fs from 'fs';
import { detectLabels, detectFaces } from '../utils/vision.js';
import generateCaption from '../utils/captionGen.js';
import matchMusic from '../utils/musicMatch.js';

export const generateStory = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imagePath = req.file.path;
    console.log('Image received:', imagePath);

    const labels = await detectLabels(imagePath);
    const mood = await detectFaces(imagePath);
    const caption = await generateCaption(labels);

    console.log('Detected labels:', labels);
    console.log('Detected mood:', mood);

    const emojis = labels.includes('bike') ? ['🏍️', '🔥'] :
                   labels.includes('birthday') ? ['🎉', '🎂'] :
                   labels.includes('temple') ? ['🙏', '🕉️'] :
                   ['✨', '💫'];

    const song = matchMusic(labels, mood);

    res.json({ caption, labels, emojis, mood, song });

    fs.unlink(imagePath, (err) => {
      if (err) console.error('Failed to delete uploaded image:', err);
    });

  } catch (err) {
    console.error('Error generating story:', err);
    res.status(500).json({ error: err.message || 'Failed to generate story' });
  }
};
