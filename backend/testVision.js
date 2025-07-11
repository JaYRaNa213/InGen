import vision from '@google-cloud/vision';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Init Vision Client with key
const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, 'google-vision.json'), // ✅ path to your key
});

const runTest = async () => {
  try {
    const imagePath = path.join(__dirname, 'uploads', 'jj.jpg');
    const [result] = await client.labelDetection(imagePath);
    const labels = result.labelAnnotations.map(label => label.description);
    console.log('✅ Labels detected:');
    console.log(labels);
  } catch (err) {
    console.error('❌ Vision API error:', err.message);
  }
};

runTest();
