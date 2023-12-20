import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenHeader } from '../constants/Axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Background, Btn, Field } from '../components';
import { bgColor, bgGlass, neon } from '../constants/Constants';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

async function save(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, serializedValue);
    return true; // Successfully saved
  } catch (error) {
    console.error('Error saving to SecureStore:', error);
    return false; // Failed to save
  }
}

const Signup = (props) => {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [newloading, setnewLoading] = useState(false);
  // const [check, setcheck] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    deviceID: '',
    password: '',
    confirmPassword: '',
    industryId: '',
  });

  const handleInputChange = (field, value) => {
    setErrMsg('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignup = async () => {
    setnewLoading(true);
    const { name, email, password, deviceID, industryId } = formData;

    // if (password !== confirmPassword) {
    //   setErrMsg('Password do not match');
    //   setnewLoading(false);
    //   return;
    // }
    try {
      const response = await axios.post('user/register', {
        name,
        email,
        password,
        deviceID,
        industryId,
      });

      const user = response.data.user;
      await save('epicUser', user);
      props.navigation.navigate('ProfileSetup', { user: user });
      setLoading(false);
      setnewLoading(false);
    } catch (error) {
      console.log(error.response);
      if ((error.response && error.response.status === 400) || 404) {
        setError('Cannot create user with this registration number');
      } else {
        console.error('Error logging in:');
      }
      setnewLoading(false);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.header}>Welcome</Text>
          <Text style={styles.headerText}>Create a new account</Text>
        </View>
        <ScrollView>
          <View
            style={[
              Platform.OS === 'ios'
                ? styles.iosContainer
                : styles.androidContainer,
            ]}>
            <Field
              placeholder="Name"
              value={formData.name}
              icon="user"
              onChangeText={(value) => handleInputChange('name', value)}
            />
            <Field
              placeholder="Email"
              keyboardType={'email-address'}
              value={formData.email}
              icon="mail"
              onChangeText={(value) => handleInputChange('email', value)}
            />
            <Field
              placeholder="Industry Id ( provided by manager )"
              value={formData.deviceID}
              icon="key"
              onChangeText={(value) => handleInputChange('deviceID', value)}
            />
            <Field
              placeholder="Reg  No."
              value={formData.industryId}
              icon="user"
              onChangeText={(value) => handleInputChange('industryId', value)}
            />
            {errMsg !== '' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <Text style={{ color: 'red' }}>{errMsg}</Text>
              </View>
            )}

            <View style={{ position: 'relative' }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: neon,
                  borderRadius: 15,
                  color: 'white',
                  width: '100%',
                  padding: 10,
                  fontSize: 14,
                  backgroundColor: bgGlass,
                  marginVertical: 10,
                }}
                placeholderTextColor={'#EEEEEE'}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  top: 23,
                  right: 10,
                  zIndex: 2,
                  opacity: 0.5,
                }}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={neon}
                />
              </TouchableOpacity>
            </View>
            <View style={{ position: 'relative' }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: neon,
                  borderRadius: 15,
                  color: 'white',
                  width: '100%',
                  padding: 10,
                  fontSize: 14,
                  backgroundColor: bgGlass,
                  marginVertical: 10,
                }}
                placeholderTextColor={'#EEEEEE'}
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                value={formData.confirmPassword}
                onChangeText={(value) =>
                  handleInputChange('confirmPassword', value)
                }
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  top: 23,
                  right: 10,
                  zIndex: 2,
                  opacity: 0.5,
                }}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={neon}
                />
              </TouchableOpacity>
            </View>

            {error !== '' && (
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {error}
              </Text>
            )}

            <View style={styles.redirectContainer}>
              <Text style={styles.redirectMsg}>
                By signing in, you agree to our{' '}
              </Text>
              <Text style={styles.redirectBtn}>Terms & Conditions</Text>
              <Text style={styles.redirectMsg}> and </Text>
              <Text style={styles.redirectBtn}>Privacy Policy</Text>
            </View>

            <Btn
              textColor={bgColor}
              bgColor={neon}
              btnLabel="Signup"
              Press={handleSignup}
            />
            {/* {loading ? null : (
              <Btn
                textColor={bgColor}
                bgColor={neon}
                btnLabel="Next"
                loading={true}
                disable={false}
                Press={nextPage}
              />
            )} */}
            <View style={styles.redirectContainer1}>
              <Text
                style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                Already have an account ?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.redirectBtn}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      {newloading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../assets/lottieFiles/greenTik.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  iosContainer: {
    marginTop: '70%',
    marginBottom: '90%',
  },
  androidContainer: {
    marginTop: '30%',
    marginBottom: '10%',
  },
  header: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    marginTop: 50,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  redirectContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: 30,
  },
  redirectContainer1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  redirectMsg: {
    color: '#EEEEEE',
    fontSize: 16,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 16,
  },
  checkboxContainer: {
    margin: 10,
    flexDirection: 'row',
    gap: 5,
  },
  redirectBtn: {
    color: neon,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Signup;
