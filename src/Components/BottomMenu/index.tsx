import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import useTranslation, {translate} from '../../Translations';
import Colors from '../../Constants/Colors';
import {getAllNestedItems} from '../../Utils/API/Devices';

const BottomMenu: React.FC = ({
  activeScreen,
  setActiveScreen,
  buttons,
  style,
  width = '18%',
}) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container, style]}>
      {buttons.map((item, index) =>
        item.disabled ? (
          <View style={[styles.item, {width}]} opacity={0.4} key={index}>
            <Image style={styles.image} source={item.mainImageSource} />
            <Text
              style={[
                styles.text,
                activeScreen === item.name && {color: Colors.main},
              ]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {t(item.name)}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.item, {width}]}
            onPress={item.onPress}
            key={index}>
            <Image
              style={styles.image}
              source={
                activeScreen === item.name
                  ? item.activeImageSource
                  : item.mainImageSource
              }
            />
            <Text
              style={[
                styles.text,
                activeScreen === item.name && {color: Colors.main},
              ]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {t(item.name)}
            </Text>
          </TouchableOpacity>
        ),
      )}
    </View>
  );
};

export default BottomMenu;
