// app/index.tsx
import React, { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native'; // 👈 important
import HomeScreen from '../screens/HomeScreen';

export default function Index() {
  useEffect(() => {
    const init = async () => {
      await tf.ready();
      console.log('✅ TFJS ready (from index.tsx)');
    };
    init();
  }, []);

  return <HomeScreen />;
}
