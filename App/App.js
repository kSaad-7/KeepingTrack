import React, {useState} from 'react';
import {StatusBar} from 'react-native';

import {COLORS} from './assets/appColors/Colors';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

import {
  WorkoutScreen,
  LeaderboardsScreen,
  OptionsScreen,
  AchievementsScreen,
  LoginScreen,
  SignUpScreen,
  DeleteAccountScreen,
} from './screens/index';

import {UserContext} from './ContextCreator.js';

// ----------------------------------------------------------------
// TODO: Add firebase to login and signup
// TODO:
// TODO:
// TODO:
// ----------------------------------------------------------------

function App() {
  const [user, setUser] = useState(null);

  StatusBar.setBarStyle('light-content', true);

  const getIcon = (focused, color, route) => {
    let iconName = '';
    if (route.name === 'Leaderboards') {
      iconName = focused ? 'stats-chart-sharp' : 'stats-chart-outline';
    } else if (route.name === 'Acheivements') {
      iconName = focused ? 'trophy-sharp' : 'trophy-outline';
    } else if (route.name === 'Workout') {
      iconName = focused ? 'barbell-sharp' : 'barbell-outline';
    } else if (route.name === 'Options') {
      iconName = focused ? 'settings-sharp' : 'settings-outline';
    }
    return <Icon name={iconName} size={23} color={color} />;
  };

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  // eslint-disable-next-line react/no-unstable-nested-components
  const HomeTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            return getIcon(focused, color, route);
          },
          tabBarActiveTintColor: COLORS.blue,
          tabBarInactiveTintColor: COLORS.offWhite,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 70,
            paddingTop: 9,
            backgroundColor: COLORS.darkBlack,
            borderTopColor: COLORS.blue, // ?????? This or white, decide later ??????
          },
          headerShown: false,
        })}
        initialRouteName="Workout">
        <Tab.Screen name="Leaderboards" component={LeaderboardsScreen} />
        <Tab.Screen name="Acheivements" component={AchievementsScreen} />
        <Tab.Screen name="Workout" component={WorkoutScreen} />
        <Tab.Screen name="Options" component={OptionsScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Login">
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </UserContext.Provider>
  );
}

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#49fc03', borderLeftWidth: 7}}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  /*
    Overwrite 'error' type,ƒ
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: 'red', borderLeftWidth: 7}}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};
export default App;
