import React from 'react';
import {View, Image, Text} from 'react-native';

export const MarkerImage = ({style, source}: {style: any}) => {
  return (
    <View>
      <Text>B</Text>
      <Image source={source} style={style} />
    </View>
  );
};
