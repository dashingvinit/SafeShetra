import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Welcome from '../../ui-welcome/Welcome';
import Home from '../Home';
import EmergencyContactsScreen from './emergencyContacts';
import SensorStats from './sensorStats';
import History from './History';

const HomeStack = ({ setHandleLogout }) => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen">
        {(props) => <Home {...props} setHandleLogout={setHandleLogout} />}
      </Stack.Screen>
      <Stack.Screen
        name="EmergencyContactsScreen"
        component={EmergencyContactsScreen}
      />
      <Stack.Screen name="SensorStats" component={SensorStats} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
};

export default HomeStack;
