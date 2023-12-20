// SensorStatusScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { TopBack } from '../../components';

const SensorStatusScreen = () => {
  // Sample sensor data, replace it with your actual sensor data
  const [sensorData, setSensorData] = useState([
    {
      id: 1,
      name: 'Pressure Sensor 1',
      type: 'Pressure',
      isActive: true,
      pressure: 25.5,
    },
    {
      id: 2,
      name: 'Smoke Sensor 1',
      type: 'Smoke',
      isActive: false,
      smokeLevel: 0.8,
    },
    {
      id: 3,
      name: 'Temperature Sensor 1',
      type: 'Temperature',
      isActive: true,
      temperature: 30,
    },
    // Add more sensors as needed
  ]);

  useEffect(() => {
    // Simulate updating sensor status every 5 seconds (replace with actual data fetching logic)
    const interval = setInterval(() => {
      const updatedData = sensorData.map((sensor) => {
        const randomValue = Math.random();
        return {
          ...sensor,
          isActive: randomValue < 0.8, // Simulate 80% chance of being active
          pressure:
            sensor.type === 'Pressure' ? randomValue * 50 : sensor.pressure,
          smokeLevel: sensor.type === 'Smoke' ? randomValue : sensor.smokeLevel,
          temperature:
            sensor.type === 'Temperature'
              ? 20 + randomValue * 15
              : sensor.temperature,
        };
      });
      setSensorData(updatedData);
    }, 5000);

    return () => clearInterval(interval);
  }, [sensorData]);

  const renderSensorCards = () => {
    return sensorData.map((sensor) => (
      <View key={sensor.id} style={styles.sensorContainer}>
        <View
          style={[
            styles.sensorCard,
            { backgroundColor: sensor.isActive ? '#e0f7e0' : '#f2f2f2' },
          ]}>
          <Text style={styles.sensorName}>{sensor.name}</Text>
          <Text style={styles.sensorType}>{sensor.type}</Text>
          <Svg height="1" width="100%">
            <Line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke={sensor.isActive ? 'green' : 'red'}
              strokeWidth="2"
            />
          </Svg>
          <Text style={styles.sensorStatus}>
            {sensor.isActive ? 'Active' : 'Inactive'}
          </Text>
          {sensor.type === 'Pressure' && (
            <Text style={styles.sensorStatus}>
              Pressure: {sensor.pressure} psi
            </Text>
          )}
          {sensor.type === 'Smoke' && (
            <Text style={styles.sensorStatus}>
              Smoke Level: {sensor.smokeLevel}
            </Text>
          )}
          {sensor.type === 'Temperature' && (
            <Text style={styles.sensorStatus}>
              Temperature: {sensor.temperature} °C
            </Text>
          )}
        </View>
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopBack>
        <Text style={styles.header}>Sensor Status</Text>
      </TopBack>
      {renderSensorCards()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background color
    paddingTop: 25,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ffffff', // White text color
  },
  sensorContainer: {
    marginBottom: 16,
  },
  sensorCard: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  sensorName: {
    fontSize: 18,
    color: '#333333', // Dark text color
    marginBottom: 8,
  },
  sensorType: {
    fontSize: 16,
    color: '#666666', // Grey text color
    marginBottom: 8,
  },
  sensorStatus: {
    fontSize: 16,
    color: '#333333', // Dark text color
  },
});

export default SensorStatusScreen;
