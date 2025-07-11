// // 📱 Redesigned HomeScreen.jsx with Beautiful UI, Full Functionality, and Modular Structure

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Text,
//   View,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView
// } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as tf from '@tensorflow/tfjs';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import * as ImageManipulator from 'expo-image-manipulator';
// import * as MediaLibrary from 'expo-media-library';
// import Constants from 'expo-constants';
// import { API_URL } from '@env';
// import { Ionicons } from '@expo/vector-icons';
// import Colors from '../constants/Colors';

// const filterStyles = {
//   "bike-vibe": { backgroundColor: 'rgba(255, 140, 0, 0.3)' },
//   "temple-vibe": { backgroundColor: 'rgba(255, 248, 200, 0.3)' },
//   "nature-vibe": { backgroundColor: 'rgba(0, 128, 0, 0.3)' },
//   "birthday-vibe": { backgroundColor: 'rgba(255, 105, 180, 0.3)' },
//   "friends-vibe": { backgroundColor: 'rgba(0, 191, 255, 0.3)' },
//   "love-vibe": { backgroundColor: 'rgba(255, 20, 147, 0.3)' },
//   "college-vibe": { backgroundColor: 'rgba(139, 69, 19, 0.3)' },
//   default: { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
// };

// export default function HomeScreen() {
//   const cameraRef = useRef(null);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [model, setModel] = useState(null);
//   const [imageUri, setImageUri] = useState(null);
//   const [labels, setLabels] = useState([]);
//   const [storyData, setStoryData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       const libStatus = await MediaLibrary.requestPermissionsAsync();
//       setHasPermission(status === 'granted' && libStatus.status === 'granted');
//       await tf.ready();
//       const loadedModel = await cocoSsd.load();
//       setModel(loadedModel);
//     })();
//   }, []);

//   const takePhotoAndDetect = async () => {
//     if (!cameraRef.current || !model) return;
//     setLoading(true);
//     setStoryData(null);

//     const photo = await cameraRef.current.takePictureAsync({ base64: true, skipProcessing: true });
//     setImageUri(photo.uri);

//     const manipulated = await ImageManipulator.manipulateAsync(
//       photo.uri,
//       [{ resize: { width: 300 } }],
//       { base64: true }
//     );

//     const imageTensor = await tf.browser.fromPixelsAsync({ uri: manipulated.uri });
//     const predictions = await model.detect(imageTensor);
//     const topLabels = predictions.map(p => p.class);
//     setLabels(topLabels);

//     try {
//       const formData = new FormData();
//       formData.append('image', {
//         uri: manipulated.uri,
//         type: 'image/jpeg',
//         name: 'photo.jpg'
//       });

//       const res = await fetch(`${API_URL}/api/story/generate`, {
//         method: 'POST',
//         body: formData,
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       const data = await res.json();
//       console.log('🧠 AI Response:', data);
//       setStoryData(data);
//     } catch (e) {
//       console.error('Upload error:', e.message);
//     }

//     setLoading(false);
//   };

//   if (hasPermission === null) return <Text style={styles.statusText}>Requesting permissions...</Text>;
//   if (hasPermission === false) return <Text style={styles.statusText}>No access to camera</Text>;

//   return (
//     <View style={styles.container}>
//       {imageUri ? (
//         <ScrollView>
//           <View style={styles.imageContainer}>
//             <Image source={{ uri: imageUri }} style={styles.preview} />
//             {storyData && (
//               <View style={[StyleSheet.absoluteFillObject, filterStyles[storyData.filter] || filterStyles.default]} />
//             )}
//           </View>
//           <Text style={styles.subText}>🔍 Labels: {labels.join(', ')}</Text>

//           {storyData && (
//             <View style={styles.resultBox}>
//               <Text style={styles.result}>🎨 Filter: {storyData.filter}</Text>
//               <Text style={styles.result}>📝 Caption: {storyData.caption}</Text>
//               <Text style={styles.result}>😍 Emojis: {storyData.emojis.join(' ')}</Text>
//               <Text style={styles.result}>🎵 Song: {storyData.song.title}</Text>
//             </View>
//           )}

//           <TouchableOpacity style={styles.button} onPress={() => {
//             setImageUri(null);
//             setStoryData(null);
//             setLabels([]);
//           }}>
//             <Ionicons name="camera" size={24} color="white" />
//             <Text style={styles.buttonText}>Retake</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       ) : (
//         <>
//           <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} />
//           <TouchableOpacity style={styles.button} onPress={takePhotoAndDetect}>
//             <Ionicons name="image-outline" size={24} color="white" />
//             <Text style={styles.buttonText}>Capture & Generate</Text>
//           </TouchableOpacity>
//         </>
//       )}

//       {loading && <ActivityIndicator size="large" color={Colors.tint} style={{ marginTop: 20 }} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#f9f9f9'
//   },
//   statusText: {
//     marginTop: 100,
//     fontSize: 18,
//     textAlign: 'center'
//   },
//   camera: {
//     flex: 1,
//     height: 500
//   },
//   imageContainer: {
//     position: 'relative',
//     height: 450,
//     marginBottom: 10
//   },
//   preview: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover'
//   },
//   subText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginVertical: 10
//   },
//   resultBox: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 15,
//     margin: 10,
//     elevation: 3
//   },
//   result: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 6
//   },
//   button: {
//     flexDirection: 'row',
//     backgroundColor: Colors.tint,
//     padding: 12,
//     margin: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     marginLeft: 10
//   }
// });






import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import StoryPreview from '../components/StoryPreview';
import { API_URL } from '@env';

// Fallback story if API fails
const mockStoryData = {
  caption: 'A beautiful moment captured! 🌈',
  emojis: ['🌟', '🎉', '💫'],
  mood: 'Happy',
  song: { title: 'Happy Tune', url: '' },
  labels: ['nature', 'sunlight'],
  filter: 'nature-vibe',
};

export default function HomeScreen() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [model, setModel] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const libStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted' && libStatus.status === 'granted');
      await tf.ready();
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    })();
  }, []);

  const takePhotoAndDetect = async () => {
    if (!cameraRef.current || !model) return;
    setLoading(true);
    setStoryData(null);

    const photo = await cameraRef.current.takePictureAsync({ base64: true, skipProcessing: true });
    setImageUri(photo.uri);

    const manipulated = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 300 } }],
      { base64: true }
    );

    const imageTensor = await tf.browser.fromPixelsAsync({ uri: manipulated.uri });
    const predictions = await model.detect(imageTensor);
    const topLabels = predictions.map(p => p.class);

    try {
      const formData = new FormData();
      formData.append('image', {
        uri: manipulated.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const res = await fetch(`${API_URL}/api/story/generate`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = await res.json();
      console.log('🧠 AI Response:', data);

      if (!data || !data.caption) throw new Error('No data from API');
      setStoryData(data);
    } catch (e) {
      console.warn('⚠️ API failed. Using mock data:', e.message);
      setStoryData(mockStoryData);
    }

    setLoading(false);
  };

  const handleRetake = () => {
    setImageUri(null);
    setStoryData(null);
  };

  if (hasPermission === null)
    return <Text style={styles.statusText}>Requesting permissions...</Text>;
  if (hasPermission === false)
    return <Text style={styles.statusText}>No access to camera</Text>;

  return (
    <View style={styles.container}>
      {imageUri && storyData ? (
        <StoryPreview imageUri={imageUri} storyData={storyData} onRetake={handleRetake} />
      ) : (
        <>
          <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} />
          <TouchableOpacity style={styles.button} onPress={takePhotoAndDetect}>
            <Ionicons name="image-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Capture & Generate</Text>
          </TouchableOpacity>
        </>
      )}

      {loading && (
        <ActivityIndicator
          size="large"
          color={Colors.tint}
          style={{ marginTop: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f9f9f9',
  },
  statusText: {
    marginTop: 100,
    fontSize: 18,
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    height: 500,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.tint,
    padding: 12,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});
