import React from 'react';
import {Image, TextInput, View} from 'react-native';
import {styles} from './styles';
import {translate} from '../../Translations';

export const SearchInput = ({onChangeText, value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <TextInput
          value={value}
          onChangeText={text => onChangeText(text)}
          placeholder={translate('search_placeholder')}
          style={styles.searchInput}
        />
        <Image
          source={require('../../../assets/icons/searcher.png')}
          style={styles.icon}
        />
      </View>
    </View>
  );
};
