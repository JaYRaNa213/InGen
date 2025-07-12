import React, { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native'; // Needed for native ops
import HomeScreen from './screens/HomeScreen';

export default function App() {
  useEffect(() => {
    const init = async () => {
      await tf.ready();
      console.log('✅ TensorFlow.js ready');
    };
    init();
  }, []);

  return <HomeScreen />;
}
