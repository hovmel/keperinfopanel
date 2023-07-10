import AccountScreen from '../Screens/AccountScreen';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserInformationScreen from '../Screens/UserInformationScreen';

const Stack = createStackNavigator();

export const AccountScreenNavigation = ({route, navigation}) => {
  return (
    <Stack.Navigator headerMode={'None'}>
      <Stack.Screen
        name={'UserInformationScreen'}
        component={UserInformationScreen}
      />
    </Stack.Navigator>
  );
};
