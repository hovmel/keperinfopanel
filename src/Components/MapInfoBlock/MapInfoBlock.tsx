import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {StyleSheet} from 'react-native';
import {ScreenProps} from './MapInfoBlock.types';

const styles = StyleSheet.create({
  infoContainer: {
    position: 'absolute',
    bottom: 80,
    flex: 1,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginHorizontal: 60,
  },
  infoText: {
    color: Colors.main,
    fontFamily: Fonts.boldFontFamily,
    textAlign: 'center',
  },
});

export const MapInfoLabel: React.FC<ScreenProps> = ({
  style,
  text,
  onPress = () => 1,
  disableTouchable = true,
  visible = true,
}) => {
  if (!visible) {
    return <></>;
  }

  return (
    <TouchableOpacity
      style={[styles.infoContainer, style]}
      onPress={onPress}
      disabled={disableTouchable}>
      <Text style={styles.infoText}>{text}</Text>
    </TouchableOpacity>
  );
};
