import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, StackRouter} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// AUTH Screens
import Icon from 'react-native-ionicons';
import NumberVarificationScreen from '../Screens/NumberVarificationScreen';
import OtpScreen from '../Screens/OtpScreen';
import SignInScreen from '../Screens/SignInScreen';
import SignupScreen from '../Screens/SignupScreen';
// import Swicher from '../src/Screens/SwicherScreen';
import SwicherScreen from '../Screens/SwicherScreen';
import HomeScreen from '../Screens/App/HomeScreen';
import QrScanner from '../Screens/QrScanner';
import UserAccountScreen from '../Screens/App/UserAccountScreen';
import QrDataScreen from '../Screens/QrDataScreen';
import QrErrorScreen from '../Screens/QrFailure';
import QrGeneration from '../Screens/QrGeneration';
import QrDataForm from '../Screens/QrGenerationDataForm';
import color from '../colors/colors';
import TransferFormScreen from '../Screens/TransferFormScreen';
import NotificationsScreen from '../Screens/App/NotificationsScreen';
import StatementsScreen from '../Screens/App/StatementsScereen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
      labelPosition: 'below-icon',
      activeTintColor: 'white',
  
    
      inactiveTintColor: '#BDC3C7',
      style: {
          // Remove border top on both android & ios
          borderTopWidth: 0,
          borderTopColor: "transparent",
          backgroundColor: color.primary,
          elevation: 0,
         // borderTopLeftRadius:20,
         // borderTopRightRadius: 20,
          shadowColor: '#5bc4ff',
          shadowOpacity: 0,
        
          shadowOffset: {
              height: 0,
          },
          shadowRadius: 0,
      },
      tabStyle: {
          //backgroundColor:  '#FBF7F5',
      },
      labelStyle: {
          fontWeight: 'bold',
          fontSize: 11,
         
      },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />


      <Tab.Screen
        name="Scanner"
        component={QrScanner}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="qr-scanner" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={UserAccountScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PhoneScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="PhoneScreen" component={NumberVarificationScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="SignUpScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};
const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
  );
};

const MainContainer = () => {
  // screenOptions is the prop of stack.navigator
  // options is the prop of stack.screen
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Switch" component={SwicherScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="HomeScreen" component={BottomTabNavigator} />
        <Stack.Screen name="transferForm" component={TransferFormScreen} />
        <Stack.Screen name='notifications' component={NotificationsScreen}/>
        <Stack.Screen name="QrDataScreen" component={QrDataScreen} />
        <Stack.Screen name="QrFailure" component={QrErrorScreen} />
        <Stack.Screen name="QrDataForm" component={QrDataForm} />
        <Stack.Screen name="QrGeneration" component={QrGeneration} />
        <Stack.Screen name='statements' component={StatementsScreen}/>
        <Stack.Screen name="Login" component={LoginNavigator} />
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
