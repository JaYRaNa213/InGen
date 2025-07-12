import 'dotenv/config';

export default {
  expo: {
    name: 'InGen',
    slug: 'InGen',
    extra: {
      API_URL: process.env.API_URL,
      eas: {
        projectId: '41a29adf-48ed-4bf0-be4a-50fe5410f20b',
      },
    },
    android: {
      package: 'com.jayrana000.ingen', // ✅ use your unique Play Store-style package name
      versionCode: 1, // ✅ optional: needed if updating later
    },
  },
};
