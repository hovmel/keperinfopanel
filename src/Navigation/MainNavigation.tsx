import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';
import MapScreen from '../Screens/MapScreen/Map.screen';
import QRCodeScannerScreen from '../Screens/QRCodeScannerScreen';
import AccountScreen from '../Screens/AccountScreen';
import StatesScreen from '../Screens/StatesScreen';
import ChooseObject from '../Screens/ChooseObject';
import DashboardScreen from '../Screens/DashboardScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';
import SupportScreen from '../Screens/SupportScreen';
import InfoScreen from '../Screens/InfoScreen';
import TextScreen from '../Screens/TextScreen';

const Stack = createStackNavigator();

export const MainNavigation = () => {
  return (
    <Stack.Navigator headerMode={'none'} screenOptions={{}}>
      <Stack.Screen name={'Home'} component={Home} />
      <Stack.Screen name={'Map'} component={MapScreen} />
      <Stack.Screen name={'States'} component={StatesScreen} />
      <Stack.Screen name={'Dashboard'} component={DashboardScreen} />
      <Stack.Screen name={'ChooseObject'} component={ChooseObject} />
      <Stack.Screen
        name={'QRCodeScannerScreen'}
        component={QRCodeScannerScreen}
      />
      <Stack.Screen name={'AccountsScreen'} component={AccountScreen} />
      <Stack.Screen name={'FavoritesScreen'} component={FavoritesScreen} />
      <Stack.Screen name={'SupportScreen'} component={SupportScreen} />
      <Stack.Screen name={'InfoScreen'} component={InfoScreen} />
      <Stack.Screen name={'TextScreen'} component={TextScreen} />
    </Stack.Navigator>
  );
};
