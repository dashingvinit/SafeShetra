import { View, Text, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from '../constants/Axios';
import React, { useEffect, useState, useRef } from 'react';
import { Background, Gender, Btn, Field } from '../components';
import { neon, bgColor } from '../constants/Constants';
import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';

const ProfileSetup = (props) => {
  const { user } = props.route.params;

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        try {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          location.latitude;
        } catch (error) {
          console.error('Error getting current location:', error);
        }
      } catch (error) {
        console.error('Error fetching target location:', error);
      }
    };
    getLocation();
  }, []);

  setTokenHeader();
  const [newloading, setnewLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const scrollRef = useRef(null);

  const [formData, setFormData] = useState({
    Id: user?._id,
    skills: undefined,
    phoneNumber: '',
    gender: 'other',
    latitude: 0,
    longitude: 0,
    address: '',
  });

  const handleProfileSetup = async () => {
    setnewLoading(true);

    try {
      formData.latitude = location?.coords.latitude;
      formData.longitude = location?.coords.longitude;
      const response = await axios.patch('/user/update', formData);
      props.navigation.navigate('Home');
    } catch (error) {
      alert('Setup failed');
      console.error('Error:', 'profilesetup', error);
    }
    setnewLoading(false);
  };

  const handleGenderSelect = (gender) => {
    const selectedGender = gender;
    setFormData((prevFormData) => ({
      ...prevFormData,
      gender: selectedGender,
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  return (
    <Background>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
        ref={scrollRef}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            marginBottom: '15%',
          }}>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <Text
              style={{
                color: neon,
                fontSize: 40,
                fontWeight: 'bold',
                marginTop: 50,
                textAlign: 'center',
              }}>
              Welcome
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}>
              Setup your profile😉
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}>
            <Field
              placeholder="Skills"
              icon="octagon"
              value={formData.skills}
              onChangeText={(value) => handleInputChange('skills', value)}
            />
            <Field
              placeholder="RegId"
              icon="anchor"
              value={formData.regId}
              onChangeText={(value) => handleInputChange('regId', value)}
            />
            <Field
              keyboardType={
                Platform.OS === 'android'
                  ? 'phone-pad'
                  : Platform.OS === 'ios'
                  ? 'number-pad'
                  : 'numbers-and-punctuation'
              }
              placeholder="Ph No."
              icon="chevrons-up"
              value={formData.phoneNumber.toString()}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
            />
            <Gender onSelect={handleGenderSelect} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text style={{ color: 'white', fontSize: 16, marginRight: 10 }}>
                Address:
              </Text>
              <View style={{ width: '100%', flex: 1 }}>
                <Field
                  placeholder="Line 1"
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                />
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Btn
                textColor={bgColor}
                bgColor={neon}
                btnLabel="Update"
                Press={handleProfileSetup}
              />
            </View>
          </View>
        </View>
        {newloading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              source={require('../assets/lottieFiles/loadingSkeliton.json')}
              autoPlay
              loop
            />
          </View>
        )}
      </ScrollView>
    </Background>
  );
};

export default ProfileSetup;
