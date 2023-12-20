import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Background2 } from '../components';
import { Btn } from '../components';
import { bgColor, neon } from '../constants/Constants';

const Home = (props) => {
  return (
    <Background2>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: 38,
            }}>
            SafeShetra
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <Text
            style={{
              //fontFamily: 'Poppins-Black',
              letterSpacing: 1,
              color: 'white',
              fontSize: 32,
            }}>
            Your Safety, Our Priority
          </Text>

          <Text style={styles.bottomText}>
            - Real-Time Hazard Alerts
            {'\n'}- Personalized Safety Recommendations.
            {'\n'}- Emergency Response Coordination.
          </Text>

          <Btn
            bgColor={neon}
            textColor={bgColor}
            btnLabel="Lets Go >>>"
            Press={() => props.navigation.navigate('Login')}
          />

          {/* <Btn
            bgColor={neon}
            textColor={bgColor}
            btnLabel="Home>>>"
            Press={() => props.navigation.navigate('Home')}
          /> */}

          <View style={styles.redirect}>
            <Text style={styles.redirectMsg}>New to safeShetra?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signup')}>
              <Text style={styles.signup}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background2>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '100%',
  },
  bottomText: {
    color: '#F7FFE5',
    textShadowColor: '#27374D',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontSize: 18,
    lineHeight: 30,
    marginVertical: 10,
  },
  redirect: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redirectMsg: {
    color: '#ffffff99',
    fontSize: 12,
    marginRight: 5,
  },
  signup: {
    color: 'white',
    fontSize: 14,
  },
});

export default Home;
