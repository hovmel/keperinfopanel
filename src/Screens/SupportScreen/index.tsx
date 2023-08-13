import React, {FC, ReactElement, ReactNode, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {ArrowNavigationHeader} from '../../Components/Header/ArrowNavigationHeader';
import useInputState from '../../hooks/useInputState';
import MyInput from '../../Components/MyInput';
import {SimpleButton} from '../../Components/SimpleButton';
import {TextButton} from '../../Components/TextButton';
import useTranslation, {translate} from '../../Translations';
import {sendSupport} from '../../Utils/API/Support';
import Colors from '../../Constants/Colors';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from "react-native-safe-area-context";

interface Props {
  navigation: any;
}

const SupportScreen: FC<Props> = ({navigation}) => {
  const toastRef = useRef();

  const [name, setName, nameError, setNameError] = useInputState();
  const [
    organization,
    setOrganization,
    organizationError,
    setOrganizationError,
  ] = useInputState();
  const [telephone, setTelephone, telephoneError, setTelephoneError] =
    useInputState();
  const [email, setEmail, emailError, setEmailError] = useInputState();
  const [question, setQuestion, questionError, setQuestionError] =
    useInputState();

  const [isSending, setSending] = useState(false);

  const {t} = useTranslation();

  const send = async () => {
    setSending(true);

    let flag = false;
    if (!name) {
      setNameError(t('Name is required'));
      flag = true;
    }
    if (!telephone) {
      setTelephoneError(t('Telephone is required'));
      flag = true;
    }
    if (!email) {
      setEmailError(t('E-mail is required'));
      flag = true;
    }
    if (!organization) {
      setOrganizationError(t('Organization is required'));
      flag = true;
    }
    if (flag) {
      setSending(false);
      return;
    }

    const data = {
      name,
      organization,
      phone: telephone,
      email,
      question,
    };

    const isSent = await sendSupport(data);
    setSending(false);
    if (isSent) {
      navigation.goBack();
    } else {
      toastRef.current.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Something went wrong',
        position: 'bottom',
        bottomOffset: 80,
        visibilityTime: 2500,
        autoHide: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ArrowNavigationHeader header={t('support')} />
        <Text style={styles.title}>{t('support_text')}</Text>
        <MyInput
          wrapperStyle={styles.input}
          placeholder={t('Name*')}
          value={name}
          onChangeText={setName}
          error={nameError}
          autoCapitalize={'characters'}
        />
        <MyInput
          wrapperStyle={styles.input}
          placeholder={t('Organization*')}
          value={organization}
          onChangeText={setOrganization}
          error={organizationError}
          autoCapitalize={'characters'}
        />
        <MyInput
          wrapperStyle={styles.input}
          placeholder={t('Telephone*')}
          value={telephone}
          onChangeText={setTelephone}
          error={telephoneError}
          keyboardType={'numeric'}
        />
        <MyInput
          wrapperStyle={styles.input}
          placeholder={t('E-mail*')}
          value={email}
          onChangeText={setEmail}
          error={emailError}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />
        <MyInput
          wrapperStyle={styles.input}
          style={styles.multiline}
          placeholder={t('Your question')}
          value={question}
          onChangeText={setQuestion}
          multiline
          numberOfLines={10}
        />
        <TouchableOpacity
          style={[styles.button, isSending && styles.disabled]}
          disabled={isSending}
          onPress={send}
          activeOpacity={0.6}>
          {isSending ? (
            <ActivityIndicator color={Colors.white} size={'small'} />
          ) : (
            <Text style={styles.buttonText}>{t('send')}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <Toast ref={toastRef} />
    </SafeAreaView>
  );
};

export default SupportScreen;
