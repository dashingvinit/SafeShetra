import React, { useEffect } from 'react';
import {
  Graph,
  Top,
  Userstatusbox,
  GradientBG,
  CheckedIn,
} from '../components';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { bgGlass, neon } from '../constants/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = (props) => {
  return (
    <GradientBG>
      <View style={{ flex: 1 }}>
        <Top
          navigation={props.navigation}
          setHandleLogout={props.setHandleLogout}
        />
        <ScrollView>
          <Graph />
          <View style={styles.boxesContainer}>
            <View style={styles.box}>
              <Userstatusbox />
            </View>

            <View style={styles.box}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('EmergencyContactsScreen')
                }>
                <View style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons
                    name="contacts"
                    style={{
                      color: neon,
                    }}
                    size={40}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Contacts
                  </Text>
                  <Text
                    style={{ color: 'white', fontWeight: '100', fontSize: 14 }}>
                    Emergency
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('SensorStats')}>
                <View style={{ alignItems: 'center' }}>
                  <MaterialIcons
                    style={{
                      color: neon,
                    }}
                    size={50}
                    name="sensor-window"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Sensor
                  </Text>
                  <Text
                    style={{ color: 'white', fontWeight: '100', fontSize: 14 }}>
                    Status
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginBottom: 100 }}>
            <CheckedIn navigation={props.navigation} />
          </View>
        </ScrollView>
      </View>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  boxesContainer: {
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    height: 120,
    backgroundColor: bgGlass,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  boxText: {
    color: 'white',
    alignItems: 'center',
  },
  card: {
    height: 250,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 200,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Home;
