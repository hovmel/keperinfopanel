import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {useAction} from '../../hooks/useAction';
import {userActions} from '../../models/user';
import useTranslation, {translate} from '../../Translations';
import {saveUser} from '../../Utils/Storage';
import {useSelector} from 'react-redux';
import {userDataSelector} from '../../models/user/selectors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavigationMenu = props => {
  const {isVisible, onClose, logOut} = props;
  const logoutAction = useAction(userActions.logout);
  const userData = useSelector(userDataSelector);
  const navigation = useNavigation();
  const {t} = useTranslation();

  const navigationButtons = [
    {
      name: t('profile'),
      source: require('../../../assets/icons/profile.png'),
      onPress: () => {
        navigation.navigate('AccountsScreen');
        onClose();
      },
    },
    {
      name: t('main_screen'),
      source: require('../../../assets/icons/main_screen.png'),
      onPress: () => {
        navigation.navigate('Home');
        onClose();
      },
    },
    /*    {
      name: translate('add_object'),
      source: require('../../../assets/icons/add_object.png'),
      onPress: () => {},
    },*/
    {
      name: t('favorite_objects'),
      source: require('../../../assets/icons/favorite.png'),
      onPress: () => {
        navigation.navigate('FavoritesScreen');
        onClose();
      },
    },
    {
      name: t('support'),
      source: require('../../../assets/icons/support.png'),
      onPress: () => {
        navigation.navigate('SupportScreen');
        onClose();
      },
    },
    {
      name: t('info'),
      source: require('../../../assets/icons/info.png'),
      onPress: () => {
        navigation.navigate('InfoScreen');
        onClose();
      },
    },
    /*    {
      name: translate('appearance'),
      source: require('../../../assets/icons/appearence.png'),
      onPress: () => {},
    },
    {
      name: translate('settings'),
      source: require('../../../assets/icons/settings2.png'),
      onPress: () => {},
    },*/
  ];

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('login');
    saveUser('');
    logoutAction();
  };

  return (
    <Modal
      isVisible={isVisible}
      onRequestClose={onClose}
      useNativeDriver
      onBackdropPress={onClose}
      animationIn={'slideInLeft'}
      animationOut={'slideOutLeft'}
      style={styles.modal}
      backdropOpacity={0.1}>
      <View style={styles.wrapper}>
        <View style={styles.infoBlock}>
          <Image source={{uri: userData?.avatar}} style={styles.avatar} />
          <View style={styles.nameBlock}>
            <Text style={styles.name}>
              {userData?.FirstName} {userData?.LastName}
            </Text>
            <Text style={styles.info}>{userData?.UserName}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          {navigationButtons.map((button, index) => (
            <TouchableOpacity
              style={styles.buttonItem}
              key={index}
              onPress={button.onPress}>
              <Image source={button.source} style={styles.image} />
              <Text style={styles.text}>{button.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logOut}>{t('log_out')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: '100%',
    width: '80%',
    margin: 0,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: Colors.lightGray,
    paddingTop: 30,
    paddingHorizontal: 22,
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  nameBlock: {},
  name: {
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 16,
  },
  info: {
    fontFamily: Fonts.mainFontFamily,
    fontSize: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    marginRight: 16,
    borderRadius: 18,
  },
  buttons: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 20,
    marginBottom: 20,
  },
  buttonItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 48,
    resizeMode: 'contain',
    marginRight: 14,
  },
  text: {
    fontFamily: Fonts.mainFontFamily,
    fontSize: 14,
  },
  logOut: {
    color: 'red',
    fontSize: 14,
    fontFamily: Fonts.mediumFontFamily,
  },
});

export default NavigationMenu;
