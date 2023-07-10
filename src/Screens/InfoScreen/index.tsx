import React, {FC} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {ArrowNavigationHeader} from '../../Components/Header/ArrowNavigationHeader';
import LogoImage from '../../../assets/icons/Logo.png';
import {privacyPolicyText, termsOfPolicyText} from '../../Constants/InfoTexts';
import Rate, {AndroidMarket} from 'react-native-rate';
import useTranslation from '../../Translations';

interface Props {
  navigation: any;
}

const InfoScreen: FC<Props> = ({navigation}) => {
  const {t, lang} = useTranslation();

  const rateUs = () => {
    const options = {
      //AppleAppID: '2193813192',
      GooglePackageName: 'com.keplerInfoPanel',
      preferredAndroidMarket: AndroidMarket.Google,
      openAppStoreIfInAppFails: true,
    };
    Rate.rate(options, (success, errorMessage) => {
      if (success) {
        console.log('rated');
      }
      if (errorMessage) {
        console.error(`Example page Rate.rate() error: ${errorMessage}`);
      }
    });
  };

  const privacyPolicy = () => {
    navigation.navigate('TextScreen', {
      header: t('privacy_policy'),
      text: privacyPolicyText[lang],
    });
  };

  const termsOfService = () => {
    navigation.navigate('TextScreen', {
      header: t('terms_of_service'),
      text: termsOfPolicyText[lang],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ArrowNavigationHeader header={t('information')} />
        <View style={styles.header}>
          <Image source={LogoImage} style={styles.logo} />
          <Text style={styles.version}>{t('Version')} 2.1.1</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={rateUs}>
          <Text style={styles.buttonText}>{t('Rate us')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={privacyPolicy}>
          <Text style={styles.buttonText}>{t('Privacy Policy')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={termsOfService}>
          <Text style={styles.buttonText}>{t('Terms of Service')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InfoScreen;
