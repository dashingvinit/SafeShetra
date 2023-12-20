import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import Home from '../ui-manager/home-stack/home-stack';
import Sensor from '../ui-manager/Sensors';
import Cameras from '../ui-manager/Cameras';
import Tips from '../ui-manager/Tips';

import { bgLight, neon } from '../constants/Constants';

const Tab = createBottomTabNavigator();

const ManagerNav = ({ setHandleLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'black', // Black background
          height: 50, // Smaller height
          elevation: 0,
          borderTopWidth: 0,
          margin: 0, // Remove margin
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 0, // Remove border radius
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          marginBottom: 10,
        },

        tabBarActiveTintColor: neon,
        tabBarInactiveTintColor: 'white',
      }}
      initialRouteName="Home"
      activeColor={neon}
      inactiveColor="#3e2465">
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={25} />
          ),
        }}>
        {(props) => <Home {...props} setHandleLogout={setHandleLogout} />}
      </Tab.Screen>
      <Tab.Screen
        name="Sensor"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-automation"
              size={30}
              color={color}
            />
          ),
        }}>
        {(props) => <Sensor {...props} setHandleLogout={setHandleLogout} />}
      </Tab.Screen>
      <Tab.Screen
        name="Cameras"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="camera" size={25} color={color} />
          ),
        }}>
        {(props) => <Cameras {...props} setHandleLogout={setHandleLogout} />}
      </Tab.Screen>
      <Tab.Screen
        name="Tips"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="journal-whills" size={25} color={color} />
          ),
        }}>
        {(props) => <Tips {...props} setHandleLogout={setHandleLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default ManagerNav;
