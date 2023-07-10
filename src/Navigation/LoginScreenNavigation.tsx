import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LogInScreen} from '../Screens/LogInScreen';
import SelectServer from '../Screens/SelectServer';

const Stack = createStackNavigator();

export const LoginScreenNavigation = ({}) => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name={'LogInScreen'} component={LogInScreen} />
      <Stack.Screen name={'SelectServer'} component={SelectServer} />
    </Stack.Navigator>
  );
};
