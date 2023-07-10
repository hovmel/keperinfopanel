import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import BackArrow from '../../../assets/icons/left-arrow.png';
import Search from '../../../assets/icons/search2.png';
import Star from '../../../assets/icons/star.png';
import Avatar from '../../../assets/icons/account.png';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {userDataSelector} from '../../models/user/selectors';
import useTranslation, {translate} from '../../Translations';

export const ScreensHeader: React.FC = ({
  searchValue,
  setSearchValue,
  isSearchable = false,
}) => {
  const navigation = useNavigation();
  const userData = useSelector(userDataSelector);
  const {t} = useTranslation();

  const goBack = () => {
    navigation.goBack();
  };

  const avatarPressed = () => {
    navigation.navigate('AccountsScreen');
  };

  const starPressed = () => {};
  const searchPressed = () => {};
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={goBack}
        activeOpacity={0.5}>
        <Image source={BackArrow} style={styles.backArrow} />
      </TouchableOpacity>
      {isSearchable && (
        <View style={styles.inputView}>
          {/*          <TouchableOpacity onPress={starPressed}>
            <Image source={Star} style={styles.star} />
          </TouchableOpacity>*/}

          <TextInput
            placeholder={t('search_placeholder')}
            defaultValue={searchValue}
            onChangeText={setSearchValue}
            style={styles.input}
          />

          <TouchableOpacity onPress={searchPressed} activeOpacity={1}>
            <Image source={Search} style={styles.search} />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={styles.avatarButton}
        onPress={avatarPressed}
        activeOpacity={0.5}>
        {userData?.avatar ? (
          <Image source={{uri: userData.avatar}} style={styles.avatar} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};
