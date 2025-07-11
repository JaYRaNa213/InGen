// utils/exportStory.js

import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import { Platform, Alert } from 'react-native';

export const exportStory = async (viewRef, onSuccess = () => {}) => {
  try {
    const uri = await captureRef(viewRef, {
      format: 'jpg',
      quality: 1,
      result: 'tmpfile',
      height: 1920,
      width: 1080,
    });

    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync('AI Stories', asset, false);

    if (Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    }

    onSuccess(uri);
  } catch (err) {
    Alert.alert('Export failed', err.message);
  }
};
