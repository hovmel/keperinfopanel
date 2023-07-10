import React from 'react';
import {styles} from './styles';
import {Pressable, Text, TouchableOpacity} from 'react-native';

export const SimpleButton = ({text, onClick, containerStyle, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, disabled && {opacity: 0.3}, containerStyle]}
      onPress={() => onClick()}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
