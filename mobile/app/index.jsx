// // app/index.jsx
// import React from 'react';
// import HomeScreen from '../screens/HomeScreen';

// export default function Index() {
//   return <HomeScreen />;
// }



// import { Redirect } from 'expo-router';

// export default function Index() {
//   return <Redirect href="/home" />;
// }


// app/index.jsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Welcome to InGen Camera App</Text>
      <Button title="Open Camera" onPress={() => router.push('/home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});
