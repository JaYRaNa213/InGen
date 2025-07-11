// import React, { useRef, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Button,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import { exportStory } from '../utils/exportStory';
// import { captureRef } from 'react-native-view-shot';
// import { Audio } from 'expo-av';
// import Toast from 'react-native-toast-message';



// const StoryPreview = ({ imageUri, storyData, onRetake }) => {
//   const viewRef = useRef();
//   const soundRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const { caption, emojis, mood, song, labels, filter } = storyData || {};

//   useEffect(() => {
//     if (!song?.url) return;

//     const loadSound = async () => {
//       try {
//         const { sound } = await Audio.Sound.createAsync(
//           { uri: song.url },
//           { shouldPlay: false }
//         );
//         soundRef.current = sound;
//       } catch (e) {
//         console.error('🔇 Sound load error:', e.message);
//       }
//     };

//     loadSound();

//     return () => {
//       if (soundRef.current) {
//         soundRef.current.unloadAsync();
//         soundRef.current = null;
//       }
//     };
//   }, [song]);

//   const handlePlayPause = async () => {
//     if (!soundRef.current) return;

//     if (isPlaying) {
//       await soundRef.current.pauseAsync();
//     } else {
//       await soundRef.current.playAsync();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleExport = async () => {
//   await exportStory(viewRef, (uri) => {
//     Toast.show({
//       type: 'success',
//       text1: 'Story exported!',
//       text2: 'Saved to gallery and ready to share 🎉',
//       visibilityTime: 3000,
//     });
//   });
// };


//   if (!storyData) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.loadingText}>Generating story...</Text>
//       </View>
//     );
//   }

//   return (
//     <>
//       <View style={styles.container} ref={viewRef} collapsable={false}>
//         <Image source={{ uri: imageUri }} style={styles.image} />
//         <View
//           style={[
//             StyleSheet.absoluteFill,
//             filterMap[filter] || filterMap.default,
//           ]}
//         />

//         <View style={styles.captionBox}>
//           <Text style={styles.captionText}>{caption}</Text>
//           <Text style={styles.emojiText}>{emojis.join(' ')}</Text>
//         </View>

//         <View style={styles.details}>
//           <Text style={styles.detailTitle}>Detected Mood:</Text>
//           <Text style={styles.detailValue}>{mood}</Text>

//           <Text style={styles.detailTitle}>Tags:</Text>
//           <Text style={styles.detailValue}>{labels.join(', ')}</Text>

//           <Text style={styles.detailTitle}>Suggested Song:</Text>
//           <View style={styles.songRow}>
//             <Text style={styles.songText}>🎵 {song.title}</Text>
//             <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
//               <Text style={styles.playButtonText}>
//                 {isPlaying ? '⏸ Pause' : '▶️ Play'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       <View style={styles.buttonRow}>
//         <Button title="🎬 Export Story" onPress={handleExport} color="#1e88e5" />
//         <Button title="🔁 Retake" onPress={onRetake} color="#e91e63" />
//       </View>
//     </>
//   );
// };

// const filterMap = {
//   "bike-vibe": { backgroundColor: 'rgba(255, 140, 0, 0.3)' },
//   "temple-vibe": { backgroundColor: 'rgba(255, 248, 200, 0.3)' },
//   "nature-vibe": { backgroundColor: 'rgba(0, 128, 0, 0.3)' },
//   "birthday-vibe": { backgroundColor: 'rgba(255, 105, 180, 0.3)' },
//   "friends-vibe": { backgroundColor: 'rgba(0, 191, 255, 0.3)' },
//   "love-vibe": { backgroundColor: 'rgba(255, 20, 147, 0.3)' },
//   "college-vibe": { backgroundColor: 'rgba(139, 69, 19, 0.3)' },
//   default: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//     padding: 16,
//     borderRadius: 12,
//     backgroundColor: '#f9f9f9',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: 300,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   captionBox: {
//     marginBottom: 10,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   captionText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   emojiText: {
//     fontSize: 24,
//     marginTop: 4,
//   },
//   details: {
//     marginTop: 10,
//     marginBottom: 16,
//   },
//   detailTitle: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 6,
//   },
//   detailValue: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#333',
//   },
//   songRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   songText: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#1e88e5',
//   },
//   playButton: {
//     backgroundColor: '#1e88e5',
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 6,
//   },
//   playButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   centered: {
//     marginTop: 50,
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     color: '#777',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 16,
//   },
// });

// export default StoryPreview;




import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { exportStory } from '../utils/exportStory';
import { captureRef } from 'react-native-view-shot';
import { Audio } from 'expo-av';
import Toast from 'react-native-toast-message';

// ✅ Temporary mock (used if storyData is null)
const mockStoryData = {
  caption: 'A beautiful day in nature 🌿',
  emojis: ['🌤️', '🌳', '😊'],
  mood: 'Happy',
  song: {
    title: 'Nature Walk',
    url: '', // or provide a real audio link
  },
  labels: ['tree', 'grass', 'sky'],
  filter: 'nature-vibe',
};

const StoryPreview = ({ imageUri, storyData, onRetake }) => {
  const viewRef = useRef();
  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ Use mock if storyData not provided (e.g. Vision API down)
  const finalData = storyData || mockStoryData;
  const { caption, emojis, mood, song, labels, filter } = finalData;

  useEffect(() => {
    if (!song?.url) return;

    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: song.url },
          { shouldPlay: false }
        );
        soundRef.current = sound;
      } catch (e) {
        console.error('🔇 Sound load error:', e.message);
      }
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [song]);

  const handlePlayPause = async () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleExport = async () => {
    await exportStory(viewRef, (uri) => {
      Toast.show({
        type: 'success',
        text1: 'Story exported!',
        text2: 'Saved to gallery and ready to share 🎉',
        visibilityTime: 3000,
      });
    });
  };

  return (
    <>
      <View style={styles.container} ref={viewRef} collapsable={false}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View
          style={[
            StyleSheet.absoluteFill,
            filterMap[filter] || filterMap.default,
          ]}
        />

        <View style={styles.captionBox}>
          <Text style={styles.captionText}>{caption}</Text>
          <Text style={styles.emojiText}>{emojis.join(' ')}</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailTitle}>Detected Mood:</Text>
          <Text style={styles.detailValue}>{mood}</Text>

          <Text style={styles.detailTitle}>Tags:</Text>
          <Text style={styles.detailValue}>{labels.join(', ')}</Text>

          <Text style={styles.detailTitle}>Suggested Song:</Text>
          <View style={styles.songRow}>
            <Text style={styles.songText}>🎵 {song.title}</Text>
            {song.url ? (
              <TouchableOpacity
                onPress={handlePlayPause}
                style={styles.playButton}
              >
                <Text style={styles.playButtonText}>
                  {isPlaying ? '⏸ Pause' : '▶️ Play'}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: '#888' }}>No preview</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <Button title="🎬 Export Story" onPress={handleExport} color="#1e88e5" />
        <Button title="🔁 Retake" onPress={onRetake} color="#e91e63" />
      </View>
    </>
  );
};

const filterMap = {
  'bike-vibe': { backgroundColor: 'rgba(255, 140, 0, 0.3)' },
  'temple-vibe': { backgroundColor: 'rgba(255, 248, 200, 0.3)' },
  'nature-vibe': { backgroundColor: 'rgba(0, 128, 0, 0.3)' },
  'birthday-vibe': { backgroundColor: 'rgba(255, 105, 180, 0.3)' },
  'friends-vibe': { backgroundColor: 'rgba(0, 191, 255, 0.3)' },
  'love-vibe': { backgroundColor: 'rgba(255, 20, 147, 0.3)' },
  'college-vibe': { backgroundColor: 'rgba(139, 69, 19, 0.3)' },
  default: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
  },
  captionBox: {
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  captionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  emojiText: {
    fontSize: 24,
    marginTop: 4,
  },
  details: {
    marginTop: 10,
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  songText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e88e5',
  },
  playButton: {
    backgroundColor: '#1e88e5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  playButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  centered: {
    marginTop: 50,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#777',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
});

export default StoryPreview;
