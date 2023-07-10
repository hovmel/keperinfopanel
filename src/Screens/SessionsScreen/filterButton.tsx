import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const FilterButton = ({text, onSelect, onCancelSelection}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        if (isActive) {
          onCancelSelection();
        } else {
          onSelect();
        }
        setIsActive(!isActive);
      }}>
      <View
        style={[
          styles.filterButtonContainer,
          isActive ? styles.activeFilterButton : styles.inactiveFilterButton,
        ]}>
        <Text
          style={[
            styles.filterButtonText,
            isActive ? styles.activeFilterText : styles.inactiveFilterText,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
