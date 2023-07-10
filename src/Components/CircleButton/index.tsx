import React from 'react';
import {Image, Pressable, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const CircleButton = ({imageSource, onPress, style = {}, imageStyle = {}}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.6}
      onPress={() => {
        onPress();
      }}>
      <View style={styles.imageContainer}>
        <Image style={[styles.image, imageStyle]} source={imageSource} />
      </View>
    </TouchableOpacity>
  );
};
