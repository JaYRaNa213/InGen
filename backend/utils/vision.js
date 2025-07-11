// utils/vision.js
import vision from '@google-cloud/vision';
import dotenv from 'dotenv';
dotenv.config();

const client = new vision.ImageAnnotatorClient();

export const detectLabels = async (imagePath) => {
  const [result] = await client.labelDetection(imagePath);
  const labels = result.labelAnnotations.map(label => label.description.toLowerCase());
  return labels.slice(0, 5);
};

export const detectFaces = async (imagePath) => {
  const [result] = await client.faceDetection(imagePath);
  const faces = result.faceAnnotations;

  if (!faces || faces.length === 0) return 'neutral';

  const face = faces[0];
  if (face.joyLikelihood === 'VERY_LIKELY' || face.joyLikelihood === 'LIKELY') return 'happy';
  if (face.sorrowLikelihood === 'VERY_LIKELY' || face.sorrowLikelihood === 'LIKELY') return 'sad';
  return 'neutral';
};








// import * as tf from '@tensorflow/tfjs';
// import cocoSsd from '@tensorflow-models/coco-ssd';
// import fs from 'fs';
// import { createCanvas, loadImage } from 'canvas';

// let model;

// const loadModel = async () => {
//   if (!model) {
//     model = await cocoSsd.load();
//   }
//   return model;
// };

// export const detectLabels = async (imagePath) => {
//   const buffer = fs.readFileSync(imagePath);
//   const img = await loadImage(buffer);

//   const canvas = createCanvas(img.width, img.height);
//   const ctx = canvas.getContext('2d');
//   ctx.drawImage(img, 0, 0);

//   const input = tf.browser.fromPixels(canvas); // [h, w, 3]
// const batched = input.expandDims(0);         // [1, h, w, 3]

// const model = await loadModel();
// const predictions = await model.detect(batched); // ✅ OK

// input.dispose();
// batched.dispose();


//   const labels = predictions.map(p => p.class.toLowerCase());
//   return labels.slice(0, 5);
// };

// export const detectFaces = async () => {
//   const moods = ['happy', 'neutral', 'sad'];
//   return moods[Math.floor(Math.random() * moods.length)];
// };
