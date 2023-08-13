import React, {useEffect, useState} from 'react';
import {SimpleButton} from '../../Components/SimpleButton';
import {useNavigation} from '@react-navigation/native';
import useTranslation, {translate} from '../../Translations';
import {getUser, saveUser} from '../../Utils/Storage';
import UserInformationScreen from '../UserInformationScreen';
import {getUserData, getUserProfessions, logIn} from '../../Utils/API/User';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {ScreensHeader} from '../../Components/ScreensHeader';
import Colors from '../../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {userDataSelector} from '../../models/user/selectors';
import user, {userActions} from '../../models/user';
import Arrow from '../../../assets/icons/arrow_down.png';
import MyModal from '../DashboardScreen/components/MyModal';
import {useActionWithPayload} from '../../hooks/useAction';
import {mapTypeSelector} from '../../models/markers/selectors';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(true);
  const [isLanguageModalVisible, setLanguageModalVisible] =
    useState<boolean>(false);
  const [isMapModalVisible, setMapModalVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(true);
  const [professions, setProfessions] = useState([]);

  const [loginData, setLoginData] = useState();

  const setLang = useActionWithPayload(userActions.setLang);
  const setMap = useActionWithPayload(userActions.setMap);
  const {t, lang} = useTranslation();

  const userData = useSelector(userDataSelector);
  const mapType = useSelector(mapTypeSelector);

  useEffect(() => {
    (async () => {
      const professionsFromRequest = await getUserProfessions();
      const loginData2 = await getUser();
      if (loginData2) {
        setLoginData(JSON.parse(loginData2));
      }

      if (professionsFromRequest?.length && userData?.Professions) {
        setProfessions(
          professionsFromRequest.filter(item => {
            return userData.Professions.includes(item.Id);
          }),
        );
      }
    })();
  }, [userData]);

  const confirmPasswords = () => {
    cancelPasswords();
  };

  const cancelPasswords = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const openLanguageModal = () => {
    setLanguageModalVisible(true);
  };

  const closeLanguageModal = () => {
    setLanguageModalVisible(false);
  };

  const openMapModal = () => {
    setMapModalVisible(true);
  };

  const closeMapModal = () => {
    setMapModalVisible(false);
  };

  const changeLanguage = val => {
    setLang(val);
    closeLanguageModal();
  };

  const changeMap = val => {
    setMap(val);
    closeMapModal();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreensHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.avatarBlock}>
            <Image style={styles.avatar} source={{uri: userData?.avatar}} />
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('FavoritesScreen')}
            style={[styles.button, styles.favoritesButton]}>
            <Image
              style={styles.star}
              source={require('../../../assets/icons/star_white.png')}
            />
            <Text style={styles.buttonText}>{t('favorite_objects')}</Text>
          </TouchableOpacity>
          <View style={styles.nameInputsBlock}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>{t('name')}</Text>
              <TextInput
                editable={false}
                value={userData?.FirstName}
                style={styles.input}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>{t('last_name')}</Text>
              <TextInput
                editable={false}
                value={userData?.LastName}
                style={styles.input}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>{t('login')}</Text>
              <TextInput
                editable={false}
                value={loginData?.login}
                style={styles.input}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>{t('phone')}</Text>
              <TextInput
                editable={false}
                value={userData?.PhoneNumber}
                style={styles.input}
                keyboardType={'phone-pad'}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={openMapModal}
              style={styles.inputWrapper}>
              <Text style={styles.label}>{t('map_type')}</Text>
              <TextInput
                editable={false}
                value={mapType}
                style={styles.input}
              />
              <View style={styles.arrowView}>
                <Image source={Arrow} style={styles.arrow} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={openLanguageModal}
              style={styles.inputWrapper}>
              <Text style={styles.label}>{t('language')}</Text>
              <TextInput
                editable={false}
                value={t(lang)}
                style={styles.input}
              />
              <View style={styles.arrowView}>
                <Image source={Arrow} style={styles.arrow} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.professionsRow}>
            {professions.map(item => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  key={item.Id}
                  style={[styles.button, styles.professionsButton]}>
                  <Text style={styles.buttonText}>{item.Name}</Text>
                  {/*<Image
                    style={styles.cross}
                    source={require('../../../assets/icons/close_white.png')}
                  />*/}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.inner}>
          <Text style={styles.changePassword}>{t('change_password')}</Text>
          <View style={styles.passwordBlock}>
            <TextInput
              editable={false}
              style={styles.fieldPassword}
              secureTextEntry={isPasswordVisible}
              onChangeText={setPassword}
              value={password}
              placeholder={t('password')}
              placeholderTextColor={Colors.lightGray}
              autoCapitalize={'none'}
            />
            <TouchableOpacity
              disabled
              style={styles.touchableEye}
              onPress={() => setPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <Image
                  source={require('../../../assets/icons/PassHide.png')}
                  style={styles.eye}
                />
              ) : (
                <Image
                  source={require('../../../assets/icons/PassVisible.png')}
                  style={styles.eye}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.passwordBlock}>
            <TextInput
              editable={false}
              style={styles.fieldPassword}
              secureTextEntry={isConfirmPasswordVisible}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder={t('confirm_password')}
              placeholderTextColor={Colors.lightGray}
              autoCapitalize={'none'}
            />
            <TouchableOpacity
              disabled
              style={styles.touchableEye}
              onPress={() =>
                setConfirmPasswordVisible(!isConfirmPasswordVisible)
              }>
              {isConfirmPasswordVisible ? (
                <Image
                  source={require('../../../assets/icons/PassHide.png')}
                  style={styles.eye}
                />
              ) : (
                <Image
                  source={require('../../../assets/icons/PassVisible.png')}
                  style={styles.eye}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <View
              disabled
              onPress={confirmPasswords}
              style={[styles.button, styles.bottomButton, styles.disabled]}>
              <Text style={styles.buttonText}>{t('confirm')}</Text>
            </View>
            <View
              disabled
              onPress={cancelPasswords}
              style={[
                styles.button,
                styles.bottomButton,
                styles.cancel,
                styles.disabled,
              ]}>
              <Text style={[styles.buttonText, styles.buttonTextCancel]}>
                {t('cancel')}
              </Text>
            </View>
          </View>
        </View>
        <MyModal
          isVisible={isLanguageModalVisible}
          closeFunction={closeLanguageModal}>
          <>
            {['en', 'ru'].map(item => (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.languageItem}
                key={item}
                onPress={() => changeLanguage(item)}>
                <Text
                  style={[
                    styles.languageItemText,
                    lang === item && styles.activeLanguage,
                  ]}>
                  {t(item)}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        </MyModal>
        <MyModal isVisible={isMapModalVisible} closeFunction={closeMapModal}>
          <>
            {['Yandex', 'Google'].map(item => (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.languageItem}
                key={item}
                onPress={() => changeMap(item)}>
                <Text
                  style={[
                    styles.languageItemText,
                    lang === item && styles.activeLanguage,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        </MyModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
