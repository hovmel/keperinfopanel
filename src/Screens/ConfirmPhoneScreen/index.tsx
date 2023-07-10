import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowNavigationHeader} from '../../Components/Header/ArrowNavigationHeader';
import {TextButton} from '../../Components/TextButton';
import {styles} from './styles';
import {InputContainer} from '../../Components/InputContainer';
import TextInputMask from 'react-native-text-input-mask';
import {translate} from '../../Translations';
import Colors from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {getUserByPhone, sendVerificationCode} from '../../Utils/API/User';
import RNOtpVerify from 'react-native-otp-verify';
import {verifyCode} from '../../Utils/SMS';
import {againSendSMSSeconds} from '../../Constants/SMS';

const ConfirmPhoneScreen = props => {
  const navigation = useNavigation();
  const nextScreen = props.route.params.nextScreen;
  const headerText = props.route.params.headerText;
  const [canPressNext, setCanPressNext] = useState(false);
  const [canSendCode, setCanSendCode] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const codeInput = useRef(null);
  const [countdownTimer, setTimer] = useState(0);

  const startListeningForOtp = () => {
    return RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(otpHandler))
      .catch(p => console.log(p));
  };

  const UnlockNextIfCodeValid = (extractedCode, validCode) => {
    if (verifyCode(extractedCode, validCode)) {
      setCanPressNext(true);
      codeInput.current.setNativeProps({text: validCode.toString()});
    }
  };

  const otpHandler = (message: string) => {
    if (!message || message.length < 4) {
      return;
    }
    const extractedNumbers = /(\d{4})/g.exec(message);
    if (!extractedNumbers || extractedNumbers.length === 0) {
      console.log('handled message invalid.', extractedNumbers);
      return;
    }
    UnlockNextIfCodeValid(extractedNumbers[1], verificationCode);
    RNOtpVerify.removeListener();
  };

  const generateAndSetCode = () => {
    const randomCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    setVerificationCode(randomCode);
    setShowCodeInput(true);
  };

  const onSendSMSPressed = () => {
    if (nextScreen === 'UserDataInputScreen') {
      console.log(phoneNumber, 'checking');
      getUserByPhone(phoneNumber).then(res => {
        if (res) {
          Alert.alert(translate('error'), translate('user_already_registered'));
        } else {
          generateAndSetCode();
        }
      });
    } else {
      generateAndSetCode();
    }
  };

  useEffect(() => {
    if (verificationCode.length === 0) {
      console.log('verify code length is 0');
      return;
    }

    // Listening sms here, because of closure.
    if (Platform.OS === 'android') {
      console.log('verification code is', verificationCode);
      startListeningForOtp();
    }

    sendVerificationCode(verificationCode, phoneNumber.slice(1)).then(() =>
      console.log('verification code was sent'),
    );
    setTimer(againSendSMSSeconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationCode]);

  useEffect(() => {
    if (countdownTimer <= 0) {
      return;
    }
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [countdownTimer]);

  const getCountdownText = () => {
    if (countdownTimer <= 0) {
      return '';
    }
    return ' (' + countdownTimer + ')';
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ArrowNavigationHeader header={headerText} />
        <TextButton
          onClick={() =>
            navigation.navigate(nextScreen, {
              phone: phoneNumber,
            })
          }
          text={translate('next')}
          isActive={canPressNext}
        />
      </View>

      <InputContainer
        header={translate('mobile_number')}
        textInput={
          <TextInputMask
            type={'only-numbers'}
            style={styles.field}
            onChangeText={(formatted, extracted) => {
              // formatted: +1 (123) 456-78-90
              // extracted: 1234567890
              setPhoneNumber('7' + extracted);
              setCanSendCode(extracted.length === 10);
            }}
            mask={'+7 [000] [000] [00] [00]'}
            keyboardType="numeric"
          />
        }
      />

      {canSendCode && countdownTimer <= 0 ? (
        <TouchableOpacity onPress={() => onSendSMSPressed()}>
          <Text style={styles.sendCodeText}>{translate('sendSMSCode')}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={[styles.sendCodeText, {color: Colors.lightGray}]}>
          {translate('sendSMSCode') + getCountdownText()}
        </Text>
      )}

      {showCodeInput ? (
        <InputContainer
          header={translate('SMSCode')}
          textInput={
            <TextInput
              style={styles.field}
              keyboardType="numeric"
              maxLength={6}
              onChangeText={text => {
                UnlockNextIfCodeValid(text, verificationCode);
              }}
              ref={codeInput}
            />
          }
        />
      ) : (
        <View />
      )}
    </View>
  );
};

export default ConfirmPhoneScreen;
