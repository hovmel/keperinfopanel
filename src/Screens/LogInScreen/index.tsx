import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Colors from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import useTranslation, {translate} from '../../Translations';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useActionWithPayload} from '../../hooks/useAction';
import {userActions} from '../../models/user';
import {useSelector} from 'react-redux';
import {signingInSelector} from '../../models/user/selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LogInScreen = () => {
  const loginAction = useActionWithPayload(userActions.login);
  const [needToSaveUser, setNeedToSaveUser] = useState(true);
  const signingIn = useSelector(signingInSelector);
  const navigation = useNavigation();
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const passwordFieldRef = useRef();
  const {t} = useTranslation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const login = async () => {
    const currentServer = await AsyncStorage.getItem('currentServer');
    if (!currentServer) {
      navigation.navigate('SelectServer');
      return;
    }
    loginAction({login: userLogin, password, saveUserToCache: needToSaveUser});
  };

  return (
    <ImageBackground
      source={require('../../../assets/icons/bg.png')}
      resizeMode="cover"
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <View style={styles.container}>
        <SafeAreaView style={{}}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/icons/Logo.png')}
                style={styles.logo}
              />
            </View>
            <Text style={styles.info}>
              {t('intelligent_system_for_smart_cities')}
            </Text>

            <TextInput
              placeholderTextColor={Colors.gray}
              style={styles.inputField}
              placeholder={t('login_or_number')}
              onChangeText={setUserLogin}
              autoCapitalize={'none'}
            />

            {/* <TextInputMask
              type={'only-numbers'}
              style={styles.inputField}
              placeholder={translate('login_or_number')}
              placeholderTextColor={Colors.gray}
              onChangeText={(formatted, extracted) => {
                // extracted: 1234567890 Without +7
                setUserLogin('7' + extracted);
              }}
              // mask={'+7 [000] [000] [00] [00]'}
              keyboardType="numeric"
            /> */}

            <View style={styles.inputSectionPassword}>
              <TextInput
                ref={passwordFieldRef}
                style={styles.fieldPassword}
                secureTextEntry={!isPasswordVisible}
                onChangeText={setPassword}
                placeholder={t('password')}
                placeholderTextColor={Colors.gray}
                autoCapitalize={'none'}
              />
              <TouchableOpacity
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

            <View style={[styles.horizontalContainer, {marginBottom: 30}]}>
              {/*<View style={{flexDirection: 'row'}}>
                <BouncyCheckbox
                  isChecked={needToSaveUser}
                  onPress={setNeedToSaveUser}
                  style={styles.checkbox}
                  size={20}
                  fillColor={Colors.main}
                />
                <Text style={styles.helperText}>
                  {t('remember_me')}
                </Text>
              </View>*/}
            </View>

            <TouchableOpacity
              style={[styles.button, signingIn && styles.disabled]}
              disabled={signingIn}
              onPress={login}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>{t('sign_in')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickServerView}
              onPress={() => navigation.navigate('SelectServer')}>
              <Text style={styles.pickServerText}>{t('select_server')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};
