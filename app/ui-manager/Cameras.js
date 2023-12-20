import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Cameras = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cameraBox}>
        <Ionicons name="ios-camera" size={50} color="white" />
      </View>
      <View style={styles.cameraBox}>
        <Ionicons name="ios-camera" size={50} color="white" />
      </View>
      <View style={styles.cameraBox}>
        <Ionicons name="ios-camera" size={50} color="white" />
      </View>
      <View style={styles.cameraBox}>
        <Ionicons name="ios-camera" size={50} color="white" />
      </View>
      <View style={styles.cameraBox}>
        <Ionicons name="ios-camera" size={50} color="white" />
      </View>
      <View style={styles.cameraBox}>
        <Ionicons name="ios-camera" size={50} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 2,
  },
  cameraBox: {
    width: '45%',
    aspectRatio: 1, // Maintain square aspect ratio
    backgroundColor: '#394240',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Cameras;
