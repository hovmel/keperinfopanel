import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styles from './styles/tabs';
import SessionsScreen from '../Screens/SessionsScreen';
import MenuItem from './MenuItem';
import {SettingsScreenNavigation} from './SettingsScreenNavigation';
import {AccountScreenNavigation} from './AccountScreenNavigation';
import {ChargeScreenNavigation} from './ChargeScreenNavigation';
import {translate} from '../Translations';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.container,
        showLabel: false,
        keyboardHidesTabBar: true,
        navigationBar: true,
        safeAreaInsets: {
          bottom: 30,
        },
      }}>
      <Tab.Screen
        name="Charge"
        component={ChargeScreenNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <MenuItem
              focused={focused}
              imageSource={require('../../assets/icons/charge.png')}
              name={translate('charge_btn')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={SessionsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MenuItem
              focused={focused}
              imageSource={require('../../assets/icons/sessions.png')}
              name={translate('sessions_btn')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreenNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <MenuItem
              focused={focused}
              imageSource={require('../../assets/icons/profile.png')}
              name={translate('account_btn')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreenNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <MenuItem
              focused={focused}
              imageSource={require('../../assets/icons/settings.png')}
              name={translate('settings_btn')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
