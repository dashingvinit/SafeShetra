import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar, View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { setTokenHeader } from './app/constants/Axios';
import * as SplashScreen from 'expo-splash-screen';

import { ManagerNav, StackNav } from './app/navigation/index.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state to check if user is logged in
  const [userRole, setUserRole] = useState(null); // state to check user role

  // calls getToken and getUser on initial render
  useEffect(() => {
    getUser();
  }, []);

  // Function to delete item from secure store
  const deleteItemFromSecureStore = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  // sets the isLoggedIn state to true and calls getUser
  // --> this is passed to the StackNav component
  const sethandleLogin = () => {
    setIsLoggedIn(true);
    getUser();
  };

  // sets the isLoggedIn state to false
  // --> this is passed to the OwnerNav, AdminNav, and UserNav components
  const setHandleLogout = () => {
    setIsLoggedIn(false);
  };

  // gets the user role and sets it to the userRole state
  const getUser = async () => {
    try {
      const storedUserString = await SecureStore.getItemAsync('epicUser');
      const storedUser = JSON.parse(storedUserString);
      const userRole = storedUser?.role;
      console.log(userRole);

      setUserRole(userRole);
    } catch (error) {
      console.log(error);
    }
  };

  //Render navbar based on user role we get from getUser
  // const renderNavbarBasedOnRole = () => {
  //   if (userRole === 'user') {
  //     return <ManagerNav setHandleLogout={setHandleLogout} />;
  //   } else if (userRole === 'admin') {
  //     SplashScreen.hideAsync();
  //     return <AdminNav setHandleLogout={setHandleLogout} />;
  //   } else {
  //     SplashScreen.hideAsync();
  //     return <UserNav setHandleLogout={setHandleLogout} />;
  //   }
  // };

  // const navbar = useMemo(() => renderNavbarBasedOnRole(), [userRole]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <NavigationContainer>
        <View style={styles.content}>
          {userRole == 'user' ? (
            <ManagerNav setHandleLogout={setHandleLogout} />
          ) : (
            <StackNav sethandleLogin={sethandleLogin} />
          )}
        </View>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0, // Add padding to shift content below the status bar
    paddingBottom: Platform.OS === 'ios' ? 0 : 0, // Add padding to shift content above the bottom bar (tab bar)
    backgroundColor: 'transparent', // Make the status bar and bottom bar (tab bar) transparent
  },
  content: {
    flex: 1,
  },
});

export default App;
