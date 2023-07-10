import React from 'react';

import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import useTranslation from '../../Translations';
import Colors from '../../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import RNRestart from 'react-native-restart';

const NoConnection = () => {
  const {t} = useTranslation();

  const restart = () => {
    RNRestart.Restart();
  };

  return (
    <>
      <ImageBackground
        source={require('../../../assets/icons/bg3.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.mainText}>{t('no_connection')}</Text>
          <TouchableOpacity
            onPress={restart}
            activeOpacity={0.5}
            style={styles.button}>
            <Text style={styles.restartText}>{t('restart')}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default NoConnection;
