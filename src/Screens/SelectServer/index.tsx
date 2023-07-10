import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import useTranslation, {translate} from '../../Translations';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {ArrowNavigationHeader} from '../../Components/Header/ArrowNavigationHeader';
import {TextButton} from '../../Components/TextButton';
import Modal from 'react-native-modal';
import {InputContainer} from '../../Components/InputContainer';
import {SimpleButton} from '../../Components/SimpleButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import SelectDropdown from 'react-native-select-dropdown';
import ArrowDown from '../../../assets/icons/arrow_down.png';
import Edit from '../../../assets/icons/edit.png';
import LottieView from 'lottie-react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import data from '../StatesScreen/data';

const SelectServer = () => {
  const [showServerNameModal, setShowServerNameModal] =
    useState<Boolean>(false);
  const [newServerName, setNewServerName] = useState<string>('');
  const [servers, setServers] = useState<string[]>([]);
  const [currentServer, setCurrentServer] = useState<string>('');

  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  const [serverToDelete, setServerToDelete] = useState<string>('');
  const [serverToEdit, setServerToEdit] = useState<{
    name: string;
    index: number;
  }>('');
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [isQrModalVisible, setQrModalVisible] = useState<boolean>(false);
  const {t} = useTranslation();

  const addServer = async () => {
    const length = newServerName.length;
    let serverToAdd = newServerName;
    if (newServerName[length - 1] !== '/') {
      serverToAdd += '/';
    }
    servers.unshift(serverToAdd);
    setServers(servers);
    await AsyncStorage.setItem('servers', JSON.stringify(servers));
    setShowServerNameModal(false);
    setNewServerName('');
  };

  const openEditing = (serverName, index) => {
    setServerToEdit({name: serverName, index});
    setEditModalVisible(true);
  };

  const selectServer = (serverName: string) => {
    Alert.alert(t('restart_the_app'), t('restart_message'), [
      {
        text: t('cancel'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('restart'),
        onPress: async () => {
          await AsyncStorage.setItem('currentServer', serverName);
          RNRestart.Restart();
        },
      },
    ]);
  };

  const onRead = ({data}) => {
    setNewServerName(data);
    setQrModalVisible(false);
    setShowServerNameModal(true);
  };

  const deleteRequest = (serverName: string) => {
    setServerToDelete(serverName);
    setDeleteModalShow(true);
  };

  const cancelDeleting = () => {
    setServerToDelete('');
    setDeleteModalShow(false);
  };

  const handleServerToEdit = val => {
    setServerToEdit(prev => ({name: val, index: prev.index}));
  };

  const saveEditing = async () => {
    const newServers =
      servers.map((item, index) => {
        if (index === serverToEdit.index) {
          if (serverToEdit.name[serverToEdit.name.length - 1] !== '/') {
            return serverToEdit.name + '/';
          } else {
            return serverToEdit.name;
          }
        } else {
          return item;
        }
      }) || [];
    setServers(newServers);
    setServerToEdit({});
    setEditModalVisible(false);
    await AsyncStorage.setItem('servers', JSON.stringify(newServers));
  };

  const deleteServer = async () => {
    if (serverToDelete === currentServer) {
      Alert.alert(t('restart_the_app'), t('delete_chosen_server'), [
        {
          text: t('cancel'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: t('restart'),
          onPress: async () => {
            const newServers =
              servers.filter(item => item !== serverToDelete) || [];
            setServers(newServers);
            setDeleteModalShow(false);
            await AsyncStorage.setItem('currentServer', '');
            await AsyncStorage.setItem('servers', JSON.stringify(newServers));
            RNRestart.Restart();
          },
        },
      ]);
    } else {
      const newServers = servers.filter(item => item !== serverToDelete) || [];
      setServers(newServers);
      setDeleteModalShow(false);
      await AsyncStorage.setItem('servers', JSON.stringify(newServers));
    }
  };

  useEffect(() => {
    (async () => {
      let serversFromStorage = await AsyncStorage.getItem('servers');
      serversFromStorage = serversFromStorage
        ? JSON.parse(serversFromStorage)
        : [];
      let currentServerFromStorage =
        (await AsyncStorage.getItem('currentServer')) || '';
      if (!currentServerFromStorage) {
      }

      setServers(serversFromStorage);
      setCurrentServer(currentServerFromStorage);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ArrowNavigationHeader
        header={t('server_address')}
        rightButton={
          <TextButton
            fontSize={12}
            onClick={() => setShowServerNameModal(true)}
            text={t('add')}
          />
        }
      />
      <TouchableOpacity
        style={styles.openButton}
        activeOpacity={0.5}
        onPress={() => setQrModalVisible(true)}>
        <Text style={styles.openText}>{t('open_qr')}</Text>
      </TouchableOpacity>
      <ScrollView style={styles.wrapper}>
        {servers.length
          ? servers.map((item, index) => (
              <TouchableOpacity
                style={styles.accountItem}
                key={index}
                activeOpacity={0.6}
                onPress={() => deleteRequest(item)}>
                <Text style={styles.link}>{item}</Text>

                {item !== currentServer ? (
                  <>
                    <TouchableOpacity
                      style={styles.edit}
                      onPress={() => openEditing(item, index)}>
                      <Image source={Edit} style={styles.editImage} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.logIn}
                      onPress={() => selectServer(item)}>
                      <Text style={styles.logInText}>{t('log_in')}</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.logIn} opacity={0.6}>
                    <Text style={styles.logInText}>{t('selected')}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>

      <Modal
        style={styles.modal}
        isVisible={showServerNameModal}
        useNativeDriver
        onBackdropPress={() => setShowServerNameModal(false)}
        onBackButtonPress={() => setShowServerNameModal(false)}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropOpacity={0.5}>
        <View style={styles.modalWrapper}>
          <View style={styles.serverRow}>
            {/*<SelectDropdown
              buttonStyle={styles.dropdown}
              buttonTextStyle={styles.dropdownText}
              dropdownOverlayColor={'rgba(0, 0, 0, 0)'}
              data={['http', 'https']}
              defaultButtonText={protocol}
              onSelect={(selectedItem, index) => {
                setProtocol(selectedItem);
              }}
              renderDropdownIcon={() => (
                <Image
                  source={ArrowDown}
                  style={{width: 14, resizeMode: 'contain'}}
                />
              )}
            />
            <Text style={styles.serverDefaultText}>://</Text>*/}
            <TextInput
              style={styles.addInput}
              onChangeText={val => setNewServerName(val)}
              value={newServerName}
              autoCapitalize={'none'}
              placeholder={'http(s)://... /'}
              autoFocus
            />
            {/* <Text style={styles.serverDefaultText}>api/</Text>*/}
          </View>

          <SimpleButton
            disabled={!newServerName}
            text={t('add')}
            onClick={addServer}
            containerStyle={styles.addButton}
          />
        </View>
      </Modal>
      <Modal
        style={styles.modal}
        isVisible={isEditModalVisible}
        useNativeDriver
        onBackdropPress={() => setEditModalVisible(false)}
        onBackButtonPress={() => setEditModalVisible(false)}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropOpacity={0.5}>
        <View style={styles.modalWrapper}>
          <View style={styles.serverRow}>
            <TextInput
              style={styles.addInput}
              onChangeText={handleServerToEdit}
              value={serverToEdit?.name}
              autoCapitalize={'none'}
              placeholder={'http(s)://... /'}
              autoFocus
            />
            <Text style={styles.serverDefaultText}>api/</Text>
          </View>

          <SimpleButton
            disabled={!serverToEdit?.name}
            text={t('save')}
            onClick={saveEditing}
            containerStyle={styles.addButton}
          />
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={deleteModalShow}
        useNativeDriver
        onBackdropPress={() => setDeleteModalShow(false)}
        onBackButtonPress={() => setDeleteModalShow(false)}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropOpacity={0.5}>
        <View style={styles.modalWrapper}>
          <Text>
            {t('sure_delete')} "{serverToDelete}"
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <SimpleButton
              text={t('cancel')}
              onClick={cancelDeleting}
              containerStyle={styles.addButton}
            />
            <SimpleButton
              text={t('delete')}
              onClick={deleteServer}
              containerStyle={styles.addButton}
            />
          </View>
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={isQrModalVisible}
        useNativeDriver
        onBackdropPress={() => setQrModalVisible(false)}
        onBackButtonPress={() => setQrModalVisible(false)}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropOpacity={0.5}>
        <View style={styles.qrWrapper}>
          <QRCodeScanner
            reactivate={true}
            reactivateTimeout={1300}
            vibrate={false}
            onRead={onRead}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SelectServer;
