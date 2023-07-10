import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import useTranslation, {translate} from '../../Translations';
import {getFile, getFilePreview} from '../../Utils/API/Devices';
import Modal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
import getFormattedTime from '../../Utils/getFormattedTime';
import Colors from '../../Constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PassportsPart: React.FC = ({passports}) => {
  const [countryCode, setCountryCode] = useState();
  const [previewList, setPreviewsList] = useState([]);
  const [showBigImage, setShowBigImage] = useState<Boolean>(false);
  const [bigImageSource, setBigImageSource] = useState('');
  const [bigImageLoading, setBigImageLoading] = useState(false);

  const {t} = useTranslation();

  useEffect(() => {
    (async () => {
      const code = await AsyncStorage.getItem('country_code');
      setCountryCode(code);
    })();
  }, []);

  const filePress = async file => {
    if (file.type !== 'pdf') {
      setBigImageLoading(true);
      setShowBigImage(true);
      await setBigImageSource({uri: (await getFile(file.id)) || ''});
      setBigImageLoading(false);
    } else {
      if (Platform.OS === 'ios') {
        downloadHistory(file);
      } else {
        try {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'storage title',
              message: 'storage_permission',
            },
          ).then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //Once user grant the permission start downloading
              console.log('Storage Permission Granted.');
              downloadHistory(file);
            } else {
              //If permission denied then show alert 'Storage PermissionNot Granted'
              Alert.alert('storage_permission');
            }
          });
        } catch (err) {
          //To handle permission related issue
          console.log('error', err);
        }
      }
    }
  };

  const downloadHistory = async file => {
    const dirs = RNFetchBlob.fs.dirs;

    const path =
      dirs.DownloadDir +
      `/qullon-${new Date().getHours()}-${new Date().getMinutes()}-${Math.round(
        Math.random() * 1000,
      )}.pdf`;

    Alert.alert(
      translate('downloading_started'),
      translate('you_will_get_message_when_it_is_finished'),
    );
    const base64 = await getFile(file.id);
    RNFetchBlob.fs
      .writeFile(path, base64.split(';base64,')[1], 'base64')
      .then(res => {
        console.log('File : ', res);
        Alert.alert(translate('downloading_finished'));
      });
  };

  const modalClose = async () => {
    setShowBigImage(false);
    setBigImageSource('');
  };

  useEffect(() => {
    (async () => {
      if (passports) {
        setPreviewsList([]);
        if (Object.entries(passports.Files).length) {
          console.log(passports.Files);
          const newPreviewList = await Promise.all(
            Object.entries(passports.Files).map(async item => {
              const [key, value] = item;
              const type = key.split('.')[key.split('.').length - 1];
              return {
                id: value,
                source: {uri: await getFilePreview(value)},
                type,
              };
            }),
          );
          setPreviewsList(newPreviewList);
        } else {
          setPreviewsList([]);
        }
      }
    })();
  }, [passports]);

  return passports?.Common ? (
    <View style={styles.container}>
      <Text style={styles.title}>{passports.Name}</Text>
      <Text style={styles.lastUpdated}>
        {!!countryCode && passports?.timeFromStates ? (
          getFormattedTime(passports?.timeFromStates, countryCode)
        ) : (
          <ActivityIndicator size={'small'} color={Colors.lightGray} />
        )}
      </Text>

      {Object.keys(passports.Common).length ? (
        <View style={styles.passportItem}>
          <Text style={styles.passportBlockTitle}>Common</Text>
          {Object.keys(passports.Common).map(key => {
            return (
              !['Id', 'ProviderName'].includes(key) && (
                <View key={key} style={styles.smallItem}>
                  <Text style={styles.passportItemTitle}>{key}</Text>
                  <Text style={styles.passportItemText}>
                    {passports.Common[key] || 'Not set'}
                  </Text>
                </View>
              )
            );
          })}
        </View>
      ) : null}

      {Object.keys(passports.DataSource).length ? (
        <View style={styles.passportItem}>
          <Text style={styles.passportBlockTitle}>DataSource</Text>
          {Object.keys(passports.DataSource).map(key => {
            return (
              !['Id', 'ProviderName'].includes(key) && (
                <View key={key} style={styles.smallItem}>
                  <Text style={styles.passportItemTitle}>{key}</Text>
                  <Text style={styles.passportItemText}>
                    {passports.DataSource[key] || 'Not set'}
                  </Text>
                </View>
              )
            );
          })}
        </View>
      ) : null}

      {Object.keys(passports.Coordinates).length ? (
        <View style={styles.passportItem}>
          <Text style={styles.passportBlockTitle}>Coordinates</Text>
          {Object.keys(passports.Coordinates).map(key => {
            return (
              <View key={key} style={styles.smallItem}>
                <Text style={styles.passportItemTitle}>{key}</Text>
                <Text style={styles.passportItemText}>
                  {key === 'Coordinates'
                    ? passports.Coordinates[key].Latitude +
                      ', ' +
                      passports.Coordinates[key].Longitude
                    : passports.Coordinates[key]
                    ? 'Yes'
                    : 'No'}
                </Text>
              </View>
            );
          })}
        </View>
      ) : null}

      {Object.keys(passports.Rates).length ? (
        <View style={styles.passportItem}>
          <Text style={styles.passportBlockTitle}>Rates</Text>
          {Object.keys(passports.Rates).map(key => {
            return (
              <View key={key} style={styles.smallItem}>
                <Text style={styles.passportItemTitle}>{key}</Text>
                <Text style={styles.passportItemText}>
                  {passports.Rates[key] || 'Not set'}
                </Text>
              </View>
            );
          })}
        </View>
      ) : null}

      {Object.keys(passports.Operation).length ? (
        <View style={styles.passportItem}>
          <Text style={styles.passportBlockTitle}>Operation</Text>
          {Object.keys(passports.Operation).map(key => {
            return (
              <View key={key} style={styles.smallItem}>
                <Text style={styles.passportItemTitle}>{key}</Text>
                <Text style={styles.passportItemText}>
                  {['ProductionDate', 'StartDate'].includes(key)
                    ? getFormattedTime(passports.Operation[key])
                    : passports.Operation[key] || 'Not set'}
                </Text>
              </View>
            );
          })}
        </View>
      ) : null}

      {!previewList?.length ? (
        <Text style={[styles.passportBlockTitle, {marginTop: 20}]}>
          {t('no_files')}
        </Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageRow}>
          {previewList?.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.imageView}
                onPress={() => filePress(item)}>
                <Image
                  source={
                    item.type === 'pdf'
                      ? require('../../../assets/icons/pdf.png')
                      : item.source
                      ? item.source
                      : ''
                  }
                  style={styles.image}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      <Modal
        isVisible={showBigImage}
        onRequestClose={modalClose}
        useNativeDriver
        onBackdropPress={modalClose}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        style={styles.modal}
        backdropOpacity={0.8}>
        <View style={styles.wrapper}>
          {bigImageLoading ? (
            <Text style={styles.bigImageLoading}>{translate('loading')}</Text>
          ) : bigImageSource ? (
            <Image source={bigImageSource} style={styles.bigImage} />
          ) : null}

          <TouchableOpacity style={styles.close} onPress={modalClose}>
            <Image
              style={styles.closeImage}
              source={require('../../../assets/icons/close_white.png')}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  ) : passports === 'loading' ? (
    <Text style={{textAlign: 'center', marginTop: 10}}>
      <ActivityIndicator size={'large'} color={Colors.main} />
    </Text>
  ) : (
    <Text style={{textAlign: 'center', marginTop: 10}}>
      {t('device_turned_off')}
    </Text>
  );
};

export default PassportsPart;
