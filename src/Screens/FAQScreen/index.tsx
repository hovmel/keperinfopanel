import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {styles} from './styles';
import {ArrowNavigationHeader} from '../../Components/Header/ArrowNavigationHeader';
import {translate} from '../../Translations';
import ContactUsButton from '../../Components/ContactUsButton';

const FAQScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerStyle}>
        <ArrowNavigationHeader header={translate('faqs')} />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text>{translate('FAQ_start')}</Text>
          <ContactUsButton buttonText={translate('FAQ_connect_form')} />
          <Text>{translate('FAQ_text')}</Text>
          <Text>{translate('FAQ_text_second')}</Text>
          <ContactUsButton buttonText={translate('FAQ_application_form')} />
          <Text>{translate('FAQ_text_third')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;
