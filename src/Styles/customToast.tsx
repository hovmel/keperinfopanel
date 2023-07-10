import React from 'react';
import {BaseToast} from 'react-native-toast-message';
import Colors from '../Constants/Colors';

export const customToastConfig = {
  custom_info: ({text2, props, ...rest}) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: Colors.main, zIndex: 1000}}
      contentContainerStyle={{paddingHorizontal: 15, zIndex: 1000}}
      text1={''}
      text2={text2}
    />
  ),
};
