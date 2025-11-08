import React from 'react';
import { StyleSheet, View } from 'react-native';
import GalleryScreen from './src/screens/GalleryScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <GalleryScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100vh',
    overflow: 'hidden',
  },
});
