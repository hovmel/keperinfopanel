import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/icons/splash_screen.png')}
        style={styles.splash}
      />
    </View>
  );
};

export default LoadingScreen;
