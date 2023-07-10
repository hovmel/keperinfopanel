import React from 'react';
import {styles} from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../Constants/Colors';

export const TextButton = ({text, onClick, isActive = true, fontSize}) => {
  return (
    <View>
      {isActive ? (
        <TouchableOpacity onPress={() => onClick()}>
          <Text style={[styles.text, {fontSize}]}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={[styles.text, {color: Colors.lightGray, fontSize}]}>
          {text}
        </Text>
      )}
    </View>
  );
};
