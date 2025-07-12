// // app/index.jsx
// import React from 'react';
// import HomeScreen from '../screens/HomeScreen';

// export default function Index() {
//   return <HomeScreen />;
// }



import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/home" />;
}
