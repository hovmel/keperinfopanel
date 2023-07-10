import React from 'react';
import {styles} from './styles';
import {Text, TouchableOpacity, View} from 'react-native';

const SearchHelperListItem = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={() => onPress()}>
      <View style={styles.listItemTextContainer}>
        <Text style={styles.listItemText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchHelperListItem;
