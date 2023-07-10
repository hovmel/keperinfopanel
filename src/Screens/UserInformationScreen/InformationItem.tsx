import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {translate} from '../../Translations';

export const InformationItem = ({header, data}) => {
  return (
    <View>
      <Text style={styles.categoryText}>{header}</Text>
      <Text style={styles.dataText}>{data ? data : translate('not_set')}</Text>
    </View>
  );
};
