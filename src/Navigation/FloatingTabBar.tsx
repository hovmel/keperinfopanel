import React from 'react';
import {View} from 'react-native';
import {styles} from './styles/floatTabBarStyles';

const Tab = ({color, tab, onPress, icon}) => {
  return <View style={styles.tabContainer} />;
};

export const FloatingTabBar = ({state, navigation}) => {
  const {routes} = state;
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map(route => (
          <Tab
            tab={route}
            // icon={} onPress={} color={}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};
