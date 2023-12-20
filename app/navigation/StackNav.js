// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../ui-welcome/Welcome';
import Login from '../ui-welcome/Login';
import Signup from '../ui-welcome/Signup';
import ProfileSetup from '../ui-welcome/ProfileSetup';
import Home1 from '../ui-manager/Home';

const Stack = createNativeStackNavigator();

const StackNav = ({ sethandleLogin }) => {
  try {
    return (
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="Login">
          {(props) => <Login {...props} sethandleLogin={sethandleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Home" component={Home1} />
      </Stack.Navigator>
    );
  } catch (error) {
    console.log('Error in stack screen:', error);
  }
};

export default StackNav;
