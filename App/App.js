import React, {useState, useRef, useEffect} from 'react';
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
  ChangeDetailsScreen,
  ExercisesScreen,
  ChangeDayNameScreen,
  PreMadePlansScreen,
  StartScreen,
} from './screens/index';

import {UserContext, WorkoutContext} from './ContextCreator.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, getDoc, getDocs} from 'firebase/firestore';
import {db} from './firebase.config';
import {LoadingIndicator} from './components/LoadingIndicator/LoadingIndicator';

// TODO  -------------------
// change all of the navigators so that they properly work.
// TODO  -------------------

function App() {
  const [user, setUser] = useState(null);
  const [currentExercise, setCurrentExercise] = useState({});
  const [currentPreMadePlan, setCurrentPreMadePlan] = useState({});
  const [userToken, setUserToken] = useState(null);
  const [isInitalLoading, setIsInitalLoading] = useState(false);
  let workoutDayRef = useRef(null); // todo: talk about how you changed it from useState -> useRef to avoid re-renders and thus fix your proble

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
            backgroundColor: COLORS.backgroundBlack,
            borderTopColor: COLORS.backgroundBlack,
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

  // eslint-disable-next-line react/no-unstable-nested-components
  const Tabs = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Start">
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="PreMadePlans" component={PreMadePlansScreen} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
        <Stack.Screen name="ChangeDetails" component={ChangeDetailsScreen} />
        <Stack.Screen name="Exercises" component={ExercisesScreen} />
        <Stack.Screen name="ChangeDayName" component={ChangeDayNameScreen} />
      </Stack.Navigator>
    );
  };

  const getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        console.log(value);
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkIfUserHasToken = async () => {
    setIsInitalLoading(true);
    const token = await getUserToken();
    setUserToken(token);
    if (token) {
      const docRef = doc(db, 'users', `${token}`);
      const userSnapshot = await getDoc(docRef);
      if (userSnapshot.exists()) {
        console.log('Document data:', userSnapshot.data());
        setUser({...userSnapshot.data(), docId: userSnapshot.id});
      } else {
        console.log('No such document!');
      }
    }
    setIsInitalLoading(false);
  };

  useEffect(() => {
    checkIfUserHasToken();
  }, []);

  if (isInitalLoading) {
    return <LoadingIndicator />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      <WorkoutContext.Provider
        value={{
          workoutDayRef,
          currentExercise,
          setCurrentExercise,
          currentPreMadePlan,
          setCurrentPreMadePlan,
        }}>
        <NavigationContainer>
          {userToken ? <HomeTabs /> : <Tabs />}
          {/* <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Start">
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="PreMadePlans" component={PreMadePlansScreen} />
            <Stack.Screen
              name="DeleteAccount"
              component={DeleteAccountScreen}
            />
            <Stack.Screen
              name="ChangeDetails"
              component={ChangeDetailsScreen}
            />
            <Stack.Screen name="Exercises" component={ExercisesScreen} />
            <Stack.Screen
              name="ChangeDayName"
              component={ChangeDayNameScreen}
            />
          </Stack.Navigator> */}
        </NavigationContainer>
        <Toast config={toastConfig} />
      </WorkoutContext.Provider>
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
