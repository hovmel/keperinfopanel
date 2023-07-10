import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../Screens/SettingsScreen';
import TextInformationScreen from '../Screens/TextInformationScreen';
import {
  GuideScreen,
  TermsAndConditionsScreen,
} from '../Screens/TextInformationScreens';
import {ContactUsScreen} from '../Screens/ContactUsScreen';
import FAQScreen from '../Screens/FAQScreen';
import PrivacyPolicyScreen from "../Screens/PrivacyPolicyScreen";

const Stack = createStackNavigator();

export const SettingsScreenNavigation = () => {
  return (
    <Stack.Navigator headerMode={'None'}>
      <Stack.Screen name={'SettingsScreen'} component={SettingsScreen} />
      <Stack.Screen name={'GuideScreen'} component={GuideScreen} />
      <Stack.Screen name={'FAQScreen'} component={FAQScreen} />
      <Stack.Screen name={'ContactUsScreen'} component={ContactUsScreen} />
      <Stack.Screen
        name={'PrivacyPolicyScreen'}
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen
        name={'TermsAndConditionsScreen'}
        component={TermsAndConditionsScreen}
      />
    </Stack.Navigator>
  );
};
