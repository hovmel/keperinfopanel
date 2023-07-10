import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const ContactUsButton = ({buttonText, style}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{justifyContent: 'center', height: 25, ...style}}
      onPress={() => {
        navigation.navigate('ContactUsScreen', {
          screen: 'SettingsScreenNavigation',
        });
      }}>
      <Text style={styles.pressableText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default ContactUsButton;
