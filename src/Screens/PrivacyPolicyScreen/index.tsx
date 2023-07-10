import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {styles} from './styles';
import {ArrowNavigationHeader} from '../../Components/Header/ArrowNavigationHeader';
import {translate} from '../../Translations';
import ContactUsButton from '../../Components/ContactUsButton';

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerStyle}>
        <ArrowNavigationHeader header={translate('privacy_policy')} />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text>{translate('privacy_policy_text_1_0')}</Text>
          <Text>{translate('privacy_policy_text_1_1')}</Text>
          <ContactUsButton buttonText={translate('privacy_policy_text_2')} />
          <Text>{translate('privacy_policy_text_3')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;
