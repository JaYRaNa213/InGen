import 'dotenv/config';

const isEASBuild = !!process.env.API_URL;

export default {
  expo: {
    name: 'InGen',
    slug: 'InGen',
    version: '1.0.0',
    plugins: ['expo-router'],
    orientation: 'portrait',
    scheme: 'ingen',
    icon: './assets/images/icon.png',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    android: {
      package: 'com.jayrana000.ingen',
      versionCode: 1
    },
    extra: {
      API_URL: process.env.API_URL,
      eas: {
        projectId: '41a29adf-48ed-4bf0-be4a-50fe5410f20b'
      }
    }
  }
};
