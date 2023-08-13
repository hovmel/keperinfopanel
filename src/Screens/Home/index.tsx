import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {
  Image,
  ScrollView,
  TouchableHighlight,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert, Platform,
} from 'react-native';
import Colors from '../../Constants/Colors';
import useTranslation, {translate} from '../../Translations';
import {
  getAllNestedItems,
  loadAllMarkers,
  getAllMarkersIcons,
  getAllItems,
} from '../../Utils/API/Devices';
import NavigationMenu from '../../Components/NavigationMenu/NavigationMenu';
import {saveUser} from '../../Utils/Storage';
import {CircleButton} from '../../Components/CircleButton';
import {getFullUserData, getUserData, logIn} from '../../Utils/API/User';
import {userActions} from '../../models/user';
import {useActionWithPayload} from '../../hooks/useAction';
import {useSelector} from 'react-redux';
import {markersToRenderSelector} from '../../models/markers/selectors';
import {markerActions} from '../../models/markers';
import {filterMarkersToRender} from '../../Utils/Markers';
import AllObjectsFromStaticData from '../../Constants/allObjectsOfSundrax.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {convertMarkersToRender} from '../../Utils/objectsHelper';

const Home = () => {
  const navigation = useNavigation();

  const [objectsCount, setObjectsCount] = useState<number>(0);
  const [modalMenuShow, setModalMenuShow] = useState(false);
  const [userDataFromState, setUserDataFromState] = useState<Object>({});
  const setUserData = useActionWithPayload(userActions.setUserData);
  const setMap = useActionWithPayload(userActions.setMap);

  const {t} = useTranslation();

  const setMarkersToStorage = useActionWithPayload(
    markerActions.setMarkersToLoad,
  );
  const setNestedObjectsToStorage = useActionWithPayload(
    markerActions.setNestedObjects,
  );
  const setAllObjectsToStorage = useActionWithPayload(
    markerActions.setAllObjects,
  );
  const setAllMarkersIcons = useActionWithPayload(
    markerActions.setAllMarkersIcons,
  );

  const convertNestedObjects = nestedObjects => {
    const newList = [];
    nestedObjects.forEach(item => {
      newList.push({
        ...item,
        Items: undefined,
      });
      item?.Items?.forEach(item2 => {
        newList.push({
          ...item2,
          Items: undefined,
          ParentName: item?.Name,
        });
        item2?.Items?.forEach(item3 => {
          newList.push({
            ...item3,
            Items: undefined,
            ParentName: item2?.Name,
          });
          item3?.Items?.forEach(item4 => {
            newList.push({
              ...item4,
              Items: undefined,
              ParentName: item3?.Name,
            });
          });
        });
      });
    });
    return newList;
  };

  useEffect(() => {
    (async () => {
      console.log('rendering...');
      const serverName = await AsyncStorage.getItem('currentServer');
      const mapType = (await AsyncStorage.getItem('map')) || Platform.OS === 'android' ? 'Yandex' : 'Google';
      setMap(mapType);
      const isSundraxServer =
        serverName === 'http://sundrax1.zapto.org/QulonWeb/';

      const userData = await getFullUserData();

      const nestedObjects = await getAllNestedItems();
      setNestedObjectsToStorage(nestedObjects);

      setUserDataFromState(userData);
      setUserData(userData);

      let allObjects;
      if (isSundraxServer) {
        allObjects = AllObjectsFromStaticData;
        setAllObjectsToStorage(allObjects);
      } else {
        allObjects = await getAllItems();
        setAllObjectsToStorage(convertNestedObjects(nestedObjects));
      }

      setObjectsCount(isSundraxServer ? 2459 : allObjects.length);

      if (!userData || !nestedObjects || !allObjects) {
        return Alert.alert(t('error'), t('home_loading_error'));
      }

      if (isSundraxServer) {
        return;
      }

      const convertedMarkers = convertMarkersToRender(
        nestedObjects,
        allObjects,
      );

      setMarkersToStorage(convertedMarkers);

      //const allMarkers = await loadAllMarkers(nestedObjects);
      //const allMarkersIcons = await getAllMarkersIcons();

      //const tmpMarkersToRender = filterMarkersToRender(allMarkers);
      //setMarkersToStorage(allObjects);
    })();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/icons/bg3.png')}
      resizeMode="cover"
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <CircleButton
            style={styles.menuButton}
            imageStyle={{opacity: 0.8}}
            imageSource={require('../../../assets/icons/menu_cut.png')}
            onPress={() => {
              setModalMenuShow(true);
            }}
          />
          <Image
            style={styles.logo}
            source={require('../../../assets/icons/Logo.png')}
          />
          <CircleButton
            style={styles.accountButton}
            imageSource={{uri: userDataFromState?.avatar}}
            imageStyle={styles.accountImage}
            onPress={() => {
              navigation.navigate('AccountsScreen');
            }}
          />
        </View>
        <ScrollView style={styles.main}>
          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Map')}>
              <View style={styles.buttonInner}>
                <Text style={styles.buttonHeader}>{t('map')}</Text>
                {!objectsCount ? (
                  <Text style={styles.buttonInfo}>{t('loading')}...</Text>
                ) : (
                  <Text style={styles.buttonInfo}>
                    {objectsCount} {t('map_objects')}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          {/*<View style={styles.buttonItem}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Map')}>
              <View style={styles.buttonInner}>
                <Text style={styles.buttonHeader}>
                  {translate('add_objects')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>*/}
          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('States')}>
              <View style={styles.buttonInner}>
                <Text style={styles.buttonHeader}>{t('states')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Dashboard')}>
              <View style={styles.buttonInner}>
                <Text style={styles.buttonHeader}>{t('dashboard')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <NavigationMenu
          isVisible={modalMenuShow}
          onClose={() => setModalMenuShow(false)}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;
