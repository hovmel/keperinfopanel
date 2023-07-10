import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

export const SimpleHeader = ({text}) => {
  return (
    <View>
      <Text style={styles.header}>{text}</Text>
    </View>
  );
};
