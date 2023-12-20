import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from '../../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import { neon } from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Userstatusbox = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const fetchUserProfileData = async () => {
    try {
      const response = await axios.get(`/user/12345678`);
      const data = response.data;
      setUserData(data.users);
      // console.log(data.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('no data');
      } else {
        console.log('User Profile Error', error);
      }
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {userData === 'Active' ? (
        <Ionicons
          name="ios-heart-outline"
          style={{
            color: neon,
          }}
          size={50}
        />
      ) : (
        <Ionicons
          name="ios-people"
          style={{
            color: neon,
          }}
          size={45}
        />
      )}
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
        {userData.length}
      </Text>
      <Text style={{ color: 'white', fontWeight: '100', fontSize: 14 }}>
        Workers
      </Text>
    </View>
  );
};

export default Userstatusbox;
