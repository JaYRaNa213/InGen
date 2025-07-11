import vision from '@google-cloud/vision';
import dotenv from 'dotenv';
dotenv.config();

const client = new vision.ImageAnnotatorClient();

async function testVision() {
  try {
    const [result] = await client.labelDetection('./uploads/jj.jpg');
    console.log('✅ Labels:', result.labelAnnotations.map(l => l.description));
  } catch (error) {
    console.error('❌ Vision API Auth Failed:', error.message);
  }
}

testVision();
