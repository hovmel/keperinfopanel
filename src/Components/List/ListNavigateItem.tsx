import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const ListNavigateItem = ({
  item,
  onPress,
  isSelected,
  imageSource = null,
}) => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer, isSelected ? styles.selectedItem : null]}
      onPressIn={onPress}
      activeOpacity={1}>
      {imageSource ? (
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={imageSource} />
        </View>
      ) : null}

      <Text style={styles.itemTitle}>{item.title}</Text>

      <Image
        style={styles.arrow}
        source={require('../../../assets/icons/arrow.png')}
      />
    </TouchableOpacity>
  );
};
