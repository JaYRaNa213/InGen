import { View, Text, StyleSheet } from 'react-native';

export default function PreviewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📸 This is the Preview Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
