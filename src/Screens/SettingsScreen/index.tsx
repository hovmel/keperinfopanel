import React from 'react';
import {Button, View} from 'react-native';
import {NavigationList} from '../../Components/List/NavigationList';
import uuid from 'uuid';
import {SimpleHeader} from '../../Components/Header/SimpleHeader';
import {styles} from './styles';
import {translate} from '../../Translations';

const DATA = [
  {
    id: uuid.v4(),
    title: translate('user_guide'),
    navigation: {
      to: 'GuideScreen',
      params: {},
    },
  },
  {
    id: uuid.v4(),
    title: translate('faqs'),
    navigation: {
      to: 'FAQScreen',
      params: {},
    },
  },
  {
    id: uuid.v4(),
    title: translate('contact_us'),
    navigation: {
      to: 'ContactUsScreen',
      params: {},
    },
  },
  // {
  //   id: uuid.v4(),
  //   title: translate('terms_and_conditions'),
  //   navigation: {
  //     to: 'TermsAndConditionsScreen',
  //     params: {},
  //   },
  // },
  {
    id: uuid.v4(),
    title: translate('privacy_policy'),
    navigation: {
      to: 'PrivacyPolicyScreen',
      params: {},
    },
  },
];

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <SimpleHeader text={translate('settings_btn')} />
      <NavigationList data={DATA} />
    </View>
  );
};

export default SettingsScreen;
