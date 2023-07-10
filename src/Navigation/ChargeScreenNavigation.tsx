import React, {useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../Screens/MapScreen/Map.screen';
import QRCodeScannerScreen from '../Screens/QRCodeScannerScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Stack = createStackNavigator();

export const ChargeScreenNavigation = ({route, navigation}) => {
  useEffect(() => {
    try {
      let tabBarVisible = true;
      if (getFocusedRouteNameFromRoute(route) === 'QRCodeScannerScreen') {
        tabBarVisible = false;
      }
      navigation.setOptions({
        tabBarVisible: tabBarVisible,
      });
    } catch {
      console.log('route state is undefined');
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator headerMode={'None'}>
      <Stack.Screen name={'MapScreen'} component={MapScreen} />
      <Stack.Screen
        name={'QRCodeScannerScreen'}
        component={QRCodeScannerScreen}
        options={{
          animationEnabled: true,
          detachPreviousScreen: false,
        }}
      />
    </Stack.Navigator>
  );
};
