import vision from '@google-cloud/vision';
import dotenv from 'dotenv';
dotenv.config();

const client = new vision.ImageAnnotatorClient();

async function main() {
  try {
    const [result] = await client.labelDetection('./uploads/jj.jpg');
    const labels = result.labelAnnotations.map(l => l.description);
    console.log('✅ Success! Detected labels:', labels);
  } catch (err) {
    console.error('❌ Vision API Error:', err.message);
  }
}

main();
