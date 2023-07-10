import React, {useState} from 'react';
import {styles} from './styles';
import {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {translate} from '../../Translations';
import LottieView from 'lottie-react-native';
import {SimpleButton} from '../../Components/SimpleButton';
import {CircleButton} from '../../Components/CircleButton';
import {saveUser} from '../../Utils/Storage';
import NavigationMenu from '../../Components/NavigationMenu/NavigationMenu';

const QRCodeScannerScreen = props => {
  const {navigation} = props;
  const {params} = props.route;

  const [modalMenuShow, setModalMenuShow] = useState(false);
  const [scannedText, setScannedText] = useState('false');

  const onRead = ({data: Id}) => {
    setScannedText(Id);
    console.log('Qr code scanned');
    params.onRead(Id);
    navigation.navigate('Map');
  };

  return (
    <>
      <CircleButton
        style={styles.accountButton}
        imageSource={require('../../../assets/icons/account.png')}
        onPress={() => {
          setModalMenuShow(true);
        }}
      />
      <QRCodeScanner
        reactivate={true}
        reactivateTimeout={1300}
        vibrate={false}
        onRead={onRead}
        topContent={
          <View>
            <Text style={styles.centerText}>{translate('scan_qr')}</Text>

            {scannedText ? (
              <View /*style={styles.successContainer}*/>
                {/*<LottieView
                  ref={animation => {
                    this.successAnimation = animation;
                  }}
                  source={require('../../../assets/animations/success.json')}
                  autoPlay={false}
                  loop={false}
                />*/}
              </View>
            ) : (
              <View style={styles.waitingContainer}>
                <LottieView
                  source={require('../../../assets/animations/scan.json')}
                  autoPlay={true}
                  loop={true}
                />
              </View>
            )}
          </View>
        }
        bottomContent={
          <SimpleButton
            style={styles.backButton}
            onClick={() => navigation.goBack()}
            text={translate('go_back')}
          />
        }
      />
      <NavigationMenu
        isVisible={modalMenuShow}
        onClose={() => setModalMenuShow(false)}
      />
    </>
  );
};

export default QRCodeScannerScreen;
