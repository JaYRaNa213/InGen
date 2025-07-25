// app/home/index.jsx

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  
} from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';


import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors'; // ✅ Make sure this file exports Colors correctly

const filterStyles = {
  'bike-vibe': { backgroundColor: 'rgba(255, 140, 0, 0.3)' },
  'temple-vibe': { backgroundColor: 'rgba(255, 248, 200, 0.3)' },
  'nature-vibe': { backgroundColor: 'rgba(0, 128, 0, 0.3)' },
  'birthday-vibe': { backgroundColor: 'rgba(255, 105, 180, 0.3)' },
  'friends-vibe': { backgroundColor: 'rgba(0, 191, 255, 0.3)' },
  'love-vibe': { backgroundColor: 'rgba(255, 20, 147, 0.3)' },
  'college-vibe': { backgroundColor: 'rgba(139, 69, 19, 0.3)' },
  default: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
};

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
  const [imageUri, setImageUri] = useState(null);
  const [storyData, setStoryData] = useState(null);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const tint = Colors?.[colorScheme ?? 'light']?.tint || '#007AFF';
  const router = useRouter();

  const cameraType = Camera.Constants?.Type?.back ?? 1;

  useEffect(() => {
    (async () => {
      const cam = await Camera.requestCameraPermissionsAsync();
      const media = await MediaLibrary.requestPermissionsAsync();
      if (cam.status === 'granted' && media.status === 'granted') {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    })();
  }, []);

  const takePhotoAndDetect = async () => {
    if (!cameraRef.current) return;
    setLoading(true);
    setStoryData(null);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        skipProcessing: true,
      });

      setImageUri(photo.uri);

      await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 300 } }],
        { base64: true }
      );

      setLabels(mockStoryData.labels);
      setStoryData(mockStoryData);
    } catch (e) {
      console.warn('Error capturing image:', e.message);
      setStoryData(mockStoryData);
    }

    setLoading(false);
  };

  const handleRetake = () => {
    setImageUri(null);
    setStoryData(null);
    setLabels([]);
  };

  const handleGoBack = () => {
    try {
      router.replace('/home');
    } catch (err) {
      console.error('Navigation error:', err);
    }
  };

  if (hasPermission === null)
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  if (hasPermission === false)
    return <Text style={styles.statusText}>No access to camera or media library</Text>;

  return (
    <View style={styles.container}>
      {imageUri && storyData ? (
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.preview} />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                filterStyles[storyData.filter] || filterStyles.default,
              ]}
            />
          </View>

          <Text style={styles.subText}>🔍 Labels: {labels.join(', ')}</Text>

          <View style={styles.resultBox}>
            <Text style={styles.result}>🎨 Filter: {storyData.filter}</Text>
            <Text style={styles.result}>📝 Caption: {storyData.caption}</Text>
            <Text style={styles.result}>😍 Emojis: {storyData.emojis.join(' ')}</Text>
            <Text style={styles.result}>🎵 Song: {storyData.song?.title || 'N/A'}</Text>
          </View>

          <TouchableOpacity onPress={handleGoBack}>
            <Text style={{ textAlign: 'center', fontSize: 16, color: 'blue' }}>
              ⬅️ Back to Home
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          {Platform.OS === 'web' ? (
            <View style={[styles.camera, styles.webPlaceholder]}>
              <Text>📸 Camera preview not available on Web</Text>
            </View>
          ) : (
            <Camera style={styles.camera} type={cameraType} ref={cameraRef} />
          )}

          <TouchableOpacity style={styles.button} onPress={takePhotoAndDetect}>
            <Ionicons name="image-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Capture & Generate</Text>
          </TouchableOpacity>
        </>
      )}

      {loading && (
        <ActivityIndicator size="large" color={tint} style={{ marginTop: 20 }} />
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
  webPlaceholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    height: 450,
    marginBottom: 10,
  },
  preview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  resultBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    margin: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
      },
    }),
  },
  result: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 6,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors?.light?.tint ?? '#007AFF',
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
