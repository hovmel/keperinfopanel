import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

export const ArrowNavigationHeader = ({header, rightButton}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrowWrapper}>
          <Image
            style={styles.backArrow}
            source={require('../../../assets/icons/arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>{header}</Text>
        <View style={styles.placeholder}>{rightButton}</View>
      </View>
      <View style={styles.line} />
    </View>
  );
};
