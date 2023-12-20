import React, { useState } from 'react';
import { View, Text, Switch, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SensorCard = ({
  label,
  isEnabled,
  onToggle,
  iconSource,
  onIconPress,
}) => (
  <View style={styles.card}>
    <Image source={iconSource} style={styles.iconImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Switch
        value={isEnabled}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  </View>
);

const Sensors = () => {
  const [doorEnabled, setDoorEnabled] = useState(false);
  const [ventilationEnabled, setVentilationEnabled] = useState(false);
  const [waterEnabled, setWaterEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Industrial Sensors</Text>
      <SensorCard
        label="Door Sensor"
        isEnabled={doorEnabled}
        onToggle={() => setDoorEnabled((prev) => !prev)}
        iconSource={require('../assets/images/ball.jpg')} // Replace with your door icon path
        onIconPress={() => console.log('Door icon pressed')}
      />
      <SensorCard
        label="Ventilation Sensor"
        isEnabled={ventilationEnabled}
        onToggle={() => setVentilationEnabled((prev) => !prev)}
        iconSource={require('../assets/images/ball.jpg')} // Replace with your ventilation icon path
        onIconPress={() => console.log('Ventilation icon pressed')}
      />
      <SensorCard
        label="Water Sensor"
        isEnabled={waterEnabled}
        onToggle={() => setWaterEnabled((prev) => !prev)}
        iconSource={require('../assets/images/ball.jpg')} // Replace with your water icon path
        onIconPress={() => console.log('Water icon pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  heading: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    width: '90%', // Increased width
    borderRadius: 15,
    backgroundColor: 'white', // White color
    elevation: 3, // Adds a shadow for a card-like effect
    marginHorizontal: 8, // Horizontal margin
  },
  iconImage: {
    width: 60, // Increased width
    height: 60, // Increased height
    marginRight: 20,
    borderRadius: 10, // Rounded corners for the image
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 18,
    color: 'black', // Black color for text on white background
  },
});

export default Sensors;
