import React from 'react';
import { View, ViewProps } from 'react-native';

export const ThemedView = ({ style, ...props }: ViewProps) => {
  return <View style={style} {...props} />;
};
