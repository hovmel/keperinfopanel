import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, View} from 'react-native';
import PinView from 'react-native-pin-view';
import {styles} from './styles';
import Colors from '../../Constants/Colors';
import {translate} from '../../Translations';
import {useNavigation} from '@react-navigation/native';
import {getUserData} from '../../Utils/API/User';

const InputPIN = () => {
  const pinLength = 4;
  const navigation = useNavigation();
  const pinView = useRef(null);
  const [enteredPIN, setEnteredPIN] = useState('');
  const [helperText, setHelperText] = useState('');
  const [showRemoveButton, setShowRemoveButton] = useState(true);

  useEffect(() => {
    if (enteredPIN.length > 0) {
      setShowRemoveButton(true);
    } else {
      setShowRemoveButton(false);
    }
  }, [enteredPIN]);

  const handlePIN = pin => {
    setHelperText(translate('handling'));
    getUserData().then(json => {
      if (json && json.UF_PIN_CODE) {
        if (pin === json.UF_PIN_CODE) {
          console.log('pin is valid. Going Home...');
          navigation.reset({
            routes: [{name: 'Tabs'}],
          });
        } else {
          console.log('invalid pin');
          pinView.current.clearAll();
          setHelperText(translate('invalid_pin'));
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/icons/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.helperText}>{helperText}</Text>
      <PinView
        pinLength={pinLength}
        ref={pinView}
        onValueChange={value => {
          setEnteredPIN(value);
          if (value.length > 1) {
            setHelperText('');
          }
          if (value.length === pinLength) {
            handlePIN(value);
          }
        }}
        inputViewFilledStyle={{
          backgroundColor: Colors.main,
        }}
        customRightButton={
          showRemoveButton ? (
            <Image
              style={styles.delImage}
              source={require('../../../assets/icons/backspace.png')}
            />
          ) : undefined
        }
        buttonTextStyle={{color: Colors.white}}
        inputViewEmptyStyle={{
          backgroundColor: Colors.white,
        }}
        inputViewStyle={{borderWidth: 1, borderColor: Colors.white}}
        onButtonPress={key => {
          if (key === 'custom_right') {
            pinView.current.clear();
          }
        }}
      />
    </View>
  );
};

export default InputPIN;
