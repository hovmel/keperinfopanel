import React from 'react';
import styles from './styles/tabs';
import {Image, StyleSheet, Text, View} from 'react-native';
import Colors from '../Constants/Colors';

const getActiveTabStyle = focused =>
  StyleSheet.create({
    image: {
      tintColor: focused ? Colors.main : Colors.gray,
    },
    text: {
      color: focused ? Colors.main : Colors.gray,
    },
  });

const MenuItem = ({imageSource, focused, name}) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={imageSource}
        resizeMode="contain"
        style={[styles.icon, getActiveTabStyle(focused).image]}
      />
      <Text style={[styles.text, getActiveTabStyle(focused).text]}>{name}</Text>
    </View>
  );
};

export default MenuItem;
