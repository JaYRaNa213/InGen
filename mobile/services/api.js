// mobile/services/api.js

import Constants from 'expo-constants';

// ✅ Load API URL from expo config (works with .env via app.config.js)
const API_URL = Constants.expoConfig?.extra?.API_URL;

// 🔁 Fallback for safety
const BASE_URL = API_URL || 'http://192.168.1.5:5000'; // Update with your dev IP if needed

/**
 * 📤 Upload image to generate story from backend AI
 * @param {{ uri: string }} image - Local image object
 * @returns {Promise<object>} Generated story data
 */
export const generateStory = async (image) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    console.log('📤 Uploading to:', `${BASE_URL}/api/story`);

    const res = await fetch(`${BASE_URL}/api/story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`❌ Server Error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    console.log('✅ Story generated successfully:', data);
    return data;
  } catch (err) {
    console.error('❌ Failed to generate story:', err.message);
    throw err;
  }
};
