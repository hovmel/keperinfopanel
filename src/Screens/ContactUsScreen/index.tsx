import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowNavigationHeader} from '../../Components/Header/ArrowNavigationHeader';
import {styles} from './styles';
import {translate} from '../../Translations';
import {MultilineTextInput} from '../../Components/MultilineTextInput';
import Toast from 'react-native-toast-message';
import {customToastConfig} from '../../Styles/customToast';
import {sendApplication} from '../../Utils/API/Applications';

export const ContactUsScreen = () => {
  const [applicationText, setApplicationText] = useState('');

  const commonToastProperties = {
    position: 'bottom',
    bottomOffset: 80,
    visibilityTime: 2500,
    autoHide: true,
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        style={styles.scrollContainer}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <ArrowNavigationHeader header={translate('contact_us')} />
          <MultilineTextInput
            value={applicationText}
            onChangeText={text => setApplicationText(text)}
            style={styles.inputField}
            placeholder={translate('describe_form')}
            numberOfLines={6}
            maxLength={700}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              console.log('send application form. Not implement');
              if (!applicationText || applicationText.length < 3) {
                Toast.show({
                  type: 'custom_info',
                  text2: translate('fill_application'),
                  ...commonToastProperties,
                });
                return;
              }
              sendApplication(applicationText).then(success => {
                if (success) {
                  setApplicationText('');
                  Toast.show({
                    type: 'custom_info',
                    text2: translate('application_sent'),
                    ...commonToastProperties,
                  });
                } else {
                  Toast.show({
                    type: 'custom_info',
                    text2: translate('application_not_sent'),
                    ...commonToastProperties,
                  });
                }
              });
            }}>
            <Text style={styles.buttonText}>{translate('send_form')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} config={customToastConfig} />
    </SafeAreaView>
  );
};
