import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Water = () => {
  const [water, setWater] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem('water').then((value) => {
      if (value) {
        setWater(parseInt(value));
      }
    });
  }, []);

  const handleWater = async () => {
    const value = water + 1;
    await AsyncStorage.setItem('water', value.toString());
    setWater(value);
  };

  const handleReset = async () => {
    await AsyncStorage.setItem('water', '0');
    setWater(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>H2O</Text>
        <TouchableOpacity onPress={handleReset}>
          <View style={styles.resetButton}>
            <MaterialCommunityIcons name="cancel" size={24} color="#9DB2BF" />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.waterText}>
        {water}/10 <Text style={styles.waterUnit}>250ml* </Text>
      </Text>
      <View style={styles.waterRow}>
        <MaterialCommunityIcons name="cup" size={24} color="#9dcfe2">
          <Text style={styles.waterValue}> 2500ml</Text>
        </MaterialCommunityIcons>
        <TouchableOpacity onPress={handleWater}>
          <View style={styles.waterPlusButton}>
            <MaterialCommunityIcons
              name="water-plus-outline"
              size={24}
              color="#1a1b19"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b19',
    borderRadius: 25,
    padding: 20,
    width: '100%',
    height: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#e3e3e3',
    fontSize: 28,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#526D82',
    padding: 4,
    borderRadius: 10,
  },
  waterText: {
    color: '#e3e3e3',
    fontSize: 20,
    marginVertical: 5,
    marginBottom: 10,
  },
  waterUnit: {
    fontSize: 14,
  },
  waterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waterValue: {
    color: '#e3e3e3',
    fontSize: 12,
  },
  waterPlusButton: {
    backgroundColor: '#9dcfe2',
    padding: 4,
    borderRadius: 10,
  },
});

export default Water;
