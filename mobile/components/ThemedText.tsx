import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

type Props = TextProps & {
  type?: 'default' | 'title' | 'link';
  children: React.ReactNode;
};

export const ThemedText = ({ type = 'default', children, style, ...props }: Props) => {
  return (
    <Text style={[styles[type], style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
});
