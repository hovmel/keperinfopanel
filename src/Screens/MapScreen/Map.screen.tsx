/* eslint-disable react-hooks/exhaustive-deps */
import YaMap, {Marker, ClusteredYamap} from 'react-native-yamap';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {CircleButton} from '../../Components/CircleButton';
import Geolocation, {GeoError} from 'react-native-geolocation-service';
import {translate} from '../../Translations';
import {useFocusEffect} from '@react-navigation/native';
import {MapFilterOverlay} from '../../Components/MapFilterOverlay';
import {markerActions} from '../../models/markers';
import MapView from 'react-native-map-clustering';

import {
  getAllNestedItems,
  getDeviceEvents,
  getDeviceStatus,
  getMarkerIcon,
  getObjectById,
  getObjectControls,
  getObjectPassports,
  getObjectPhotos,
  getObjectStatus,
  getObjectTelemetry,
  getPlugShareDevices,
  loadAllMarkers,
} from '../../Utils/API/Devices';
import {errorsGPS} from '../../Constants/ErrorsGPS';
import {filterMarkersToRender, findMarkerById} from '../../Utils/Markers';
import {MapInfoLabel} from '../../Components/MapInfoBlock/MapInfoBlock';
import {PROVIDER_GOOGLE, Marker as GoogleMarker} from 'react-native-maps';
import {
  GeolocationError,
  MapFilters,
  MarkerData,
  PlugShareMarker,
  Position,
} from './Map.types';
import {CameraPosition} from 'react-native-yamap/src/interfaces';
import BottomMenu from '../../Components/BottomMenu';
import {SwipeablePanel} from 'rn-swipeable-panel';
import ObjectsPart from '../../Components/ObjectsPart';
import PassportsPart from '../../Components/PassportsPart';
import StatesPart from '../../Components/StatesPart';
import ControlPart from '../../Components/ControlPart';
import NavigationMenu from '../../Components/NavigationMenu/NavigationMenu';
import {useSelector} from 'react-redux';
import {useActionWithPayload} from '../../hooks/useAction';
import {
  allMarkersIconsSelector,
  allObjectsSelector,
  mapTypeSelector,
  markersToRenderSelector,
  nestedObjectsSelector,
} from '../../models/markers/selectors';
import {MarkerImage} from './MarkerImage';
import {logIn} from '../../Utils/API/User';
import MarkerIcons from '../../Constants/MarkerIcons';
import _ from 'lodash';
import EventsPart from '../../Components/EventsPart';
import Star from '../../../assets/icons/star.png';
import StarYellow from '../../../assets/icons/favorite_active.png';
import Search from '../../../assets/icons/search2.png';
import useActiveObject from '../../hooks/useActiveObject';
import {getUserFavorites} from '../../Utils/API/Favorites';
import moment from 'moment';
import getFormattedTime from '../../Utils/getFormattedTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import chooseObject from '../ChooseObject';
import {getStatesInfo} from '../../Utils/API/States';
import markersToRender from '../../Constants/markersToRenderOfSundrax.json';
import {Fonts} from '../../Constants/Fonts';
import Colors from '../../Constants/Colors';

// @ts-ignore
const MapScreen = ({route, navigation}) => {
  const zoomToOpenMarker: number = 19;
  const zoomDuration: number = 1;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let mapRefYandex = null;
  const mapRefGoogle = useRef(null);

  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [plugShareMarkers, setPlugShareMarkers] = useState<PlugShareMarker[]>(
    [],
  );
  const [activeScreen, setActiveScreen] = useState<string>('');
  const [modalMenuShow, setModalMenuShow] = useState(false);

  const [showMarkerDetail, setShowMarkerDetail] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeObject, setActiveObject] = useActiveObject();
  const [userPosition, setUserPosition] = useState<Position>({
    lat: 50,
    lon: 50,
  });
  const [favoriteObjectsIds, setFavoriteObjectsIds] = useState([]);
  const [isSearchStarPressed, setSearchStartPressed] = useState(false);
  const [mapFilters, setMapFilters] = useState<MapFilters>({
    showPlugShare: false,
    showOnlyJacks: false,
  });
  const [geolocationError, setGeolocationError] = useState<
    GeolocationError | undefined
  >(undefined);

  const setMarkersToStorage = useActionWithPayload(
    markerActions.setMarkersToLoad,
  );

  const [search, setSearch] = useState('');
  const [searchedObjects, setSearchedObjects] = useState<never[]>();

  const bottomPanelRef = useRef(null);

  /*const [objects, setObjects] = useState([]);*/
  const [passports, setPassports] = useState([]);
  const [states, setStates] = useState([]);
  const [telemetry, setTelemetry] = useState([]);
  const [controls, setControls] = useState([]);
  const [controlsModes, setControlsModes] = useState({});
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsRange, setEventsRange] = useState('today');
  const [statesInfo, setStatesInfo] = useState([]);
  const [eventsNotFormatted, setEventsNotFormatted] = useState([]);
  const [lastState, setLastState] = useState([]);
  const [chosenObjectId, setChosenObjectId] = useState(null);
  const [markerScale, setMarkerScale] = useState(1);
  const [photoIds, setPhotoIds] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const objects = useSelector(nestedObjectsSelector);
  const allObjects = useSelector(allObjectsSelector);
  const markersFromStorage = useSelector(markersToRenderSelector) || [];
  const mapType = useSelector(mapTypeSelector) || [];

  const [isSundraxServer, setIsSundraxServer] = useState<
    'yes' | 'no' | 'loading'
  >('loading');

  const [countryCode, setCountryCode] = useState();

  const objectsPressed = async () => {
    setActiveScreen(activeScreen !== 'objects' ? 'objects' : '');
    /*setObjects(await getAllNestedItems());*/
  };

  const passportsPressed = () => {
    setActiveScreen(activeScreen !== 'passports' ? 'passports' : '');
  };
  const statesPressed = () => {
    setActiveScreen(activeScreen !== 'states' ? 'states' : '');
  };
  const controlPressed = () => {
    setActiveScreen(activeScreen !== 'control' ? 'control' : '');
  };
  const eventsPressed = () => {
    setActiveScreen(activeScreen !== 'events' ? 'events' : '');
  };

  const singleObjectPressed = async (
    object,
    id,
    name,
    type,
    moveToObject = true,
  ) => {
    setPassports('loading');
    setActiveScreen('passports');

    if (!object.Id) {
      object.Id = object.id;
    }
    //console.log('Pressed object:', object);
    const passportsData = await getObjectPassports(object.Id || object.id);
    setPassports(
      passportsData
        ? {
            ...convertPassports(passportsData),
            Name: name,
            Id: id,
          }
        : null,
    );

    const coordinates =
      passportsData &&
      passportsData?.Categories?.find(item => item.Type === 'Coordinates')
        ?.Properties[1]?.Value;
    if (coordinates && moveToObject) {
      setMapCenter(
        {
          lat: coordinates.Latitude,
          lon: coordinates.Longitude,
        },
        mapRefYandex,
      );
    }
    setStates([]);
    setEvents([]);
    setControls([]);
    setPhotoIds([]);

    setChosenObjectId(id);
    setActiveObject(object);

    const controlsData = await getObjectControls(object.Id);
    setControls(controlsData);

    setPassports(prev =>
      prev
        ? {...prev, timeFromStates: controlsData?.TS}
        : {timeFromStates: controlsData?.TS},
    );

    const statesData = await getObjectStatus(id);

    const statesInfo = object.ProviderType
      ? await getStatesInfo(object.ProviderType, object.DeviceType)
      : [];
    setStatesInfo(statesInfo);
    statesData.Name = object.Name;

    setStates(statesData);

    await changeEventsRange('today', object.Id);

    /*    const telemetryData = await getObjectTelemetry(id);
    if (
      telemetryData &&
      telemetryData.Modes &&
      telemetryData.Modes.Jacks &&
      Object.keys(telemetryData.Modes.Jacks).length
    ) {
      //telemetryData.Modes.Coils = convertJacks(telemetryData.Modes.Jacks);
      telemetryData.Modes.Coils = telemetryData.Modes.Jacks;
    }
    setTelemetry({...telemetryData, Name: name, Id: id, DeviceType: type});*/

    let controlsModes = passportsData?.Categories?.find(
      item => item.Type === 'Modes',
    );

    if (object?.DeviceType === 'Photo') {
      let photosIds = await getObjectPhotos(object.Id);
      photosIds =
        photosIds?.sort((prev, next) =>
          moment(prev.TS).isSameOrAfter(moment(next.TS)) ? 1 : -1,
        ) || [];
      setPhotoIds(photosIds);
      setPhotoIndex(photosIds?.length - 1 || 0);
    }

    controlsModes = controlsModes?.Properties?.map(item => ({
      [item.Name]: item.Value,
    }));

    if (controlsModes) {
      controlsModes = controlsModes.reduce(
        (accumulator, currentValue) => ({...accumulator, ...currentValue}),
        {},
      );
      controlsModes.PhotoType = object?.DeviceType === 'Photo';
      setControlsModes(controlsModes);
    }

    const statusData = await getDeviceStatus(id);
    setLastState(statusData);
  };

  const changeEventsRange = async (val = 'today', id) => {
    setEventsLoading(true);
    setEventsRange(val);
    const eventsData = await getDeviceEvents(id || activeObject.Id, val);
    setEventsNotFormatted(eventsData);
    sortEvents(1, eventsData);
  };

  const convertEvents = events => {
    const newData = [];
    events.forEach((item, index) => {
      Object.keys(item).forEach(key => {
        if (key !== 'ObjectId' && key !== 'Status' && key !== 'TS') {
          if (index === 0) {
            newData.push({
              name: key,
              isChecked: true,
              data: [item[key]],
            });
          } else {
            newData.find(item => item.name === key).data.push(item[key]);
          }
        } else if (key === 'TS') {
          const newDate = getFormattedTime(item.TS, countryCode);
          if (index === 0) {
            newData.push({
              name: 'Date',
              isChecked: true,
              data: [newDate],
            });
          } else {
            newData.find(item => item.name === 'Date').data.push(newDate);
          }
        }
      });
    });
    return newData;
  };

  const sortEvents = (sortingType, events) => {
    let sorted = [];
    let data = events || eventsNotFormatted;

    if (sortingType === 2) {
      sorted = convertEvents(
        data.sort((first, second) => {
          return first.TS < second.TS ? -1 : 1;
        }),
      );
    } else {
      sorted = convertEvents(
        data.sort((first, second) => {
          return first.TS < second.TS ? 1 : -1;
        }),
      );
    }
    setEvents(sorted);
    setEventsLoading(false);
  };

  const convertPassports = passports => {
    const newPassports: any = {};
    if (passports) {
      passports.Categories.forEach(category => {
        newPassports[category.Type] = category.Properties.reduce(
          (prev, property) =>
            Object.assign(prev, {
              [category.Type === 'Files'
                ? property.Name + property.Value
                : property.Name
                ? property.Name
                : property.Type]: property.Value,
            }),
          {},
        );
      });
    } else {
      console.log('This object does not have passports');
    }
    return newPassports;
  };

  const convertJacks = jacks => {
    return jacks
      ? jacks.map(jack => ({...jack, Value: jack.Value !== '0'}))
      : jacks;
  };

  const onScanRead = async id => {
    const info = await getObjectById(id);
    await singleObjectPressed(info, id, info.Name, info.DeviceType);
  };

  const searchStarPressed = () => {
    handleSearch(search, !isSearchStarPressed);
    setSearchStartPressed(prev => !prev);
  };

  const buttons = [
    {
      name: 'objects',
      disabled: false,
      onPress: objectsPressed,
      mainImageSource: require('../../../assets/icons/Objects.png'),
      activeImageSource: require('../../../assets/icons/objects_blue.png'),
    },
    {
      name: 'passports',
      disabled: !chosenObjectId,
      onPress: passportsPressed,
      mainImageSource: require('../../../assets/icons/Passport.png'),
      activeImageSource: require('../../../assets/icons/passport_blue.png'),
    },
    {
      name: 'events',
      disabled: !chosenObjectId,
      onPress: eventsPressed,
      mainImageSource: require('../../../assets/icons/Events.png'),
      activeImageSource: require('../../../assets/icons/events_blue.png'),
    },
    {
      name: 'states',
      disabled: !chosenObjectId,
      onPress: statesPressed,
      mainImageSource: require('../../../assets/icons/States.png'),
      activeImageSource: require('../../../assets/icons/states_blue.png'),
    },
    {
      name: 'control',
      disabled: !chosenObjectId,
      onPress: controlPressed,
      mainImageSource: require('../../../assets/icons/Control.png'),
      activeImageSource: require('../../../assets/icons/control_blue.png'),
    },
  ];

  /*  useFocusEffect(
    React.useCallback(() => {
      console.log('Force Updating map', mapRefYandex?.forceUpdate);
      mapRefYandex?.forceUpdate();
    }, []),
  );*/

  useEffect(() => {
    setTimeout(() => {
      console.log('CHANGING SCALE');
      setMarkerScale(0.8);
    }, 2000);
    if (activeObject.Id) {
      singleObjectPressed(
        activeObject,
        activeObject.Id,
        activeObject.Name,
        activeObject.DeviceType,
      );
    }
    (async () => {
      const currentServerName = await AsyncStorage.getItem('currentServer');
      setIsSundraxServer(
        currentServerName === 'http://sundrax1.zapto.org/QulonWeb/'
          ? 'yes'
          : 'no',
      );

      setFavoriteObjectsIds(await getUserFavorites());
      const code = await AsyncStorage.getItem('country_code');
      setCountryCode(code);
    })();
  }, []);

  /* useEffect(() => {
    console.log('Map filters changed', mapFilters);
    if (mapFilters.showPlugShare && plugShareMarkers.length === 0) {
      loadAdditionalMarkers().then(_ => console.log('plug share loaded'));
    }
    let tmpMarkersToRender = filterMarkersToRender(markers, mapFilters);
    // Crutch, because of react try update property of Marker point by null
    // which invoke error. To fix it I clear markers array, then set markers
    // TODO invoke setter not by timeout
    setMarkersToRender([]);
    //setMarkersToRender(tmpMarkersToRender);
    setTimeout(() => setMarkersToRender(tmpMarkersToRender), 150);
  }, [mapFilters]);*/

  const setMapCenter = (point: Position, map) => {
    if (
      (mapType === 'Yandex' && !mapRefYandex?.setCenter) ||
      (mapType === 'Google' && !mapRefGoogle?.current?.animateToRegion)
    ) {
      console.log('Map ref undefined, cannot set map center', mapType);
      return;
    }

    if (mapType === 'Yandex') {
      mapRefYandex?.setCenter(point, 15, 0, 0, zoomDuration);
    } else {
      console.log(point);
      mapRefGoogle?.current?.animateToRegion(
        {
          latitude: point.lat,
          longitude: point.lon,
          latitudeDelta: 0.0002,
          longitudeDelta: 0.0002,
        },
        1000,
      );
    }
  };

  /* const loadAdditionalMarkers = async () => {
    const devices = await getPlugShareDevices();
    setPlugShareMarkers(devices);
  };*/

  const initializeMarkers = async () => {
    let allMarkers = await loadAllMarkers();
    // console.log('All markers: ', allMarkers);
    if (!allMarkers) {
      Alert.alert('Error', 'Loading error. Check your network connection');
      return;
    }

    /*    let tmpMarkersToRender = filterMarkersToRender(allMarkers, mapFilters);
    setMarkers(allMarkers);
    console.log('setMarkersToStorage');
    setMarkersToStorage(tmpMarkersToRender);*/
  };

  const setGeolocationErrorByGPSPermission = (isGranted: boolean) => {
    if (!isGranted) {
      setGeolocationError({
        message: translate('enable_geolocation'),
        type: errorsGPS.NO_PERMISSION_GRANTED,
      });
    } else {
      setGeolocationError(undefined);
    }
  };

  const handleGeolocationError = (error: GeoError) => {
    if (error.message === errorsGPS.NO_LOCATION_PROVIDER) {
      setGeolocationError({
        message: translate('enable_gps'),
        type: errorsGPS.NO_LOCATION_PROVIDER,
      });
    } else {
      setGeolocationError(undefined);
    }

    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => setGeolocationErrorByGPSPermission(granted));
    } else {
      Geolocation.requestAuthorization('always').then(status => {
        setGeolocationErrorByGPSPermission(status === 'granted');
      });
    }
  };

  const findUserOnMap = (map: ClusteredYamap) => {
    Geolocation.getCurrentPosition(
      info => {
        if (info.coords) {
          const lon = info.coords.longitude;
          const lat = info.coords.latitude;
          setMapCenter(
            {lon: lon, lat: lat},
            mapType === 'Yandex' ? mapRefYandex : mapRefGoogle,
          );
          setUserPosition({lat: lat, lon: lon});
          setGeolocationError(undefined);
        } else {
          setGeolocationError({
            message: translate('enable_geolocation'),
            type: errorsGPS.NO_LOCATION_PROVIDER,
          });
        }
      },
      (error: GeoError) => handleGeolocationError(error),
    );
  };

  const setMarkerCenter = (marker, coords) => {
    //console.log('Zooming to marker', marker, 'with coordinates:', coords);
    console.log('centering');
    console.log(
      coords || marker.coordinates,
      zoomToOpenMarker + 0.1,
      zoomDuration,
    );

    if (mapType === 'Yandex') {
      mapRefYandex?.setCenter(
        coords || marker.coordinates,
        zoomToOpenMarker + 0.1,
        0,
        0,
        zoomDuration,
      );
    } else {
      mapRefGoogle?.animateToCoordinate(
        {
          latitude: marker.coordinates.lat,
          longitude: marker.coordinates.lon,
        },
        1000,
      );
    }

    console.log('centering end');
  };

  /*  useEffect(() => {
    if (route?.params && !route.params.objectFromFavorites) {
      findUserOnMap(mapRefYandex);
    }
  }, [mapRefYandex]);*/

  useEffect(() => {
    const {objectFromFavorites} = route?.params || {};
    if (!objectFromFavorites) {
      //findUserOnMap(mapRefYandex);
    }
    //loadAdditionalMarkers().then(() => console.log('Plug share marker loaded'));

    if (!markersToRender || !markersToRender.length) {
      initializeMarkers().then(() => {
        console.log('markers were initialized');
        // update map after setting markers
        setTimeout(() => {
          mapRefYandex?.forceUpdate();
        }, 100);
      });
    }

    Geolocation.watchPosition(
      info => {
        if (info.coords) {
          setUserPosition({
            lat: info.coords.latitude,
            lon: info.coords.longitude,
          });
          setGeolocationError(undefined);
        }
      },
      error => handleGeolocationError(error),
      {enableHighAccuracy: true},
    );

    if (objectFromFavorites) {
      singleObjectPressed(
        objectFromFavorites,
        objectFromFavorites.Id,
        objectFromFavorites.Name,
        objectFromFavorites.DeviceType,
      );
    }
  }, []);

  const onMarkerPressed = (marker, open) => {
    if (open) {
      console.log('opening marker');
      singleObjectPressed(
        marker,
        marker.id,
        marker.name,
        marker.DeviceType,
        false,
      );
      return;
    }
    mapRefYandex?.getCameraPosition((position: CameraPosition) => {
      console.log('marker pressed', position.zoom, zoomToOpenMarker);
      if (position.zoom < zoomToOpenMarker) {
        setMarkerCenter(marker);
      } else {
        console.log('opening marker');
        singleObjectPressed(
          marker,
          marker.id,
          marker.name,
          marker.DeviceType,
          false,
        );
      }
    });
  };

  const handleSearch = (
    val: string,
    searchStarPressed: boolean = isSearchStarPressed,
  ) => {
    setSearch(val);

    if (!val) {
      if (searchStarPressed) {
        return setSearchedObjects(
          allObjects.filter(object => favoriteObjectsIds.includes(object.Id)),
        );
      } else {
        return setSearchedObjects(undefined);
      }
    }
    setSearchedObjects(
      val.length
        ? allObjects.filter(object => {
            let favoriteFlag = true;
            if (searchStarPressed) {
              favoriteFlag = favoriteObjectsIds.includes(object.Id);
            }
            return (
              object.Name?.toLowerCase()?.includes(val.toLowerCase()) &&
              favoriteFlag
            );
          })
        : undefined,
    );
  };

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        if (activeScreen) {
          setActiveScreen('');
        } else {
          navigation.dispatch(e.data.action);
        }
      }),
    [activeScreen],
  );

  useEffect(() => {
    if (route && route.params && route.params.DeviceId) {
      const markerId = route.params.DeviceId;
      const marker = findMarkerById(markers, markerId);
      if (marker) {
        setMapCenter(
          {
            lon: marker.coordinates.lon,
            lat: marker.coordinates.lat,
          },
          mapRefYandex,
        );
        setMarkerCenter(marker);
        openMarkerDetail(markers, markerId);
      }
      // if scan a similar QR
      navigation.setParams({
        DeviceId: null,
      });
    }
  }, [route?.params?.DeviceId]);

  const openMarkerDetail = (_markers: MarkerData[], markerId: string) => {
    const markerToOpen = findMarkerById(_markers, markerId);
    if (!markerToOpen) {
      console.warn('Marker to open not found');
      return;
    }
    setActiveObject(markerToOpen!);
    setShowMarkerDetail(true);
  };

  const starPressed = item => {
    item.isFavorite = !item.isFavorite;
    //setObjects([...objects]);
  };

  return (
    <View style={styles.container}>
      {showFilters ? (
        <MapFilterOverlay
          mapFilters={mapFilters}
          setMapFilters={setMapFilters}
          closeOverlay={() => setShowFilters(false)}
        />
      ) : undefined}
      {!activeScreen ? (
        <CircleButton
          style={styles.leftButton}
          imageSource={require('../../../assets/icons/aim.png')}
          onPress={() => {
            findUserOnMap(mapRefYandex);
          }}
        />
      ) : null}
      <CircleButton
        style={[styles.backButton, activeScreen && styles.backButtonRotated]}
        imageSource={require('../../../assets/icons/left-arrow.png')}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {activeScreen === 'objects' && (
        <View style={styles.inputView}>
          <TouchableOpacity onPress={searchStarPressed} activeOpacity={0.2}>
            <Image
              source={isSearchStarPressed ? StarYellow : Star}
              style={styles.star}
            />
          </TouchableOpacity>

          <TextInput
            placeholder={translate('search_placeholder')}
            defaultValue={search}
            onChangeText={handleSearch}
            style={styles.input}
          />

          <TouchableOpacity activeOpacity={1} disabled>
            <Image source={Search} style={styles.search} />
          </TouchableOpacity>
        </View>
      )}
      {/*<CircleButton
        style={styles.accountButton}
        imageSource={require('../../../assets/icons/account.png')}
        onPress={() => {
          setModalMenuShow(true);
        }}
      />*/}
      {/*<CircleButton
        style={styles.filterButton}
        imageSource={require('../../../assets/icons/filter.png')}
        onPress={() => setShowFilters(!showFilters)}
      />*/}
      {!activeScreen ? (
        <CircleButton
          style={styles.rightButton}
          imageSource={require('../../../assets/icons/scan.png')}
          onPress={() => {
            navigation.navigate('QRCodeScannerScreen', {onRead: onScanRead});
          }}
        />
      ) : null}
      <MapInfoLabel
        style={{marginBottom: 30}}
        text={geolocationError?.message || ''}
        onPress={Linking.openSettings}
        visible={geolocationError !== undefined}
        disableTouchable={false}
      />
      <MapInfoLabel
        style={{marginBottom: geolocationError !== undefined ? 90 : 30}}
        text={translate('markers_loading')}
        visible={!markersToRender.length}
      />
      {mapType === 'Yandex' ? (
        <ClusteredYamap
          ref={node => {
            if (node) {
              mapRefYandex = node;
            }
          }}
          clusteredMarkers={
            isSundraxServer === 'yes'
              ? markersToRender
              : isSundraxServer === 'no'
              ? markersFromStorage
              : []
          }
          style={styles.map}
          userLocationIcon={require('../../../assets/icons/UserIc.png')}
          showUserPosition
          renderMarker={({point, data: marker}, key) => {
            let iconPath = '';
            const currentType = MarkerIcons[marker.DeviceType];
            if (currentType) {
              iconPath = currentType[marker.Status];
            } else {
              return;
            }
            //console.log(marker);
            if (!iconPath) {
              console.log('Icon does not exist');
              return;
            }
            if (!marker?.coordinates?.lat) {
              return;
            }

            return (
              <Marker
                zIndex={key + 1}
                key={key}
                point={point}
                scale={markerScale}
                source={iconPath}
                onPress={() => onMarkerPressed(marker)}
              />
            );
          }}
        />
      ) : (
        <MapView
          ref={mapRefGoogle}
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          showsCompass={false}
          showsUserLocation
          showsMyLocationButton={false}
          clusterColor={'#ffffff'}
          clusterTextColor={Colors.gray}
          clusterFontFamily={Fonts.mainFontFamily}
          edgePadding={{
            bottom: 150,
          }}
          region={{
            latitude: 30,
            longitude: 20,
            latitudeDelta: 100,
            longitudeDelta: 100,
          }}>
          {(isSundraxServer === 'yes'
            ? markersToRender
            : isSundraxServer === 'no'
            ? markersFromStorage
            : []
          )?.map(({point, data: marker}, key) => {
            let iconPath = '';
            const currentType = MarkerIcons[marker.DeviceType];
            if (currentType) {
              iconPath = currentType[marker.Status];
            } else {
              return (
                <GoogleMarker
                  key={key}
                  coordinate={{latitude: 1000000, longitude: 0}}
                />
              );
            }
            //console.log(marker);
            if (!iconPath) {
              console.log('Icon does not exist');
              return (
                <GoogleMarker
                  key={key}
                  coordinate={{latitude: 1000000, longitude: 0}}
                />
              );
            }
            if (!marker?.coordinates?.lat) {
              return (
                <GoogleMarker
                  key={key}
                  coordinate={{latitude: 1000000, longitude: 0}}
                />
              );
            }

            return (
              <GoogleMarker
                key={key}
                coordinate={{latitude: point.lat, longitude: point.lon}}
                onPress={() => {
                  onMarkerPressed(marker, true);
                }}>
                <Image
                  source={iconPath}
                  style={{width: 33, height: 33}}
                  resizeMode="contain"
                />
              </GoogleMarker>
            );
          })}
        </MapView>
      )}

      <BottomMenu
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        buttons={buttons}
      />
      <SwipeablePanel
        fullWidth
        noBar={activeScreen === 'objects'}
        openLarge
        onlyLarge
        style={activeScreen === 'objects' && {paddingTop: 10}}
        isEvent={activeScreen === 'objects'}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
        }}
        isActive={!!activeScreen}
        onClose={() => setActiveScreen('')}>
        {activeScreen === 'objects' ? (
          <ObjectsPart
            objects={objects}
            starPressed={starPressed}
            singleObjectPressed={singleObjectPressed}
            selectedMarker={activeObject}
            selectedMarkerId={activeObject?.Id || activeObject?.id}
            searchedObjects={searchedObjects}
            isLoaded={markersToRender.length}
          />
        ) : activeScreen === 'passports' ? (
          <PassportsPart passports={passports} />
        ) : activeScreen === 'events' ? (
          <EventsPart
            events={events}
            sortEvents={sortEvents}
            loading={eventsLoading}
            range={eventsRange}
            changeRange={changeEventsRange}
          />
        ) : activeScreen === 'states' ? (
          <StatesPart states={states} statesInfo={statesInfo} />
        ) : activeScreen === 'control' ? (
          <ControlPart
            controls={controls}
            controlsModes={controlsModes}
            selectedMarker={activeObject}
            photoIds={photoIds}
            photoIndex={photoIndex}
            setPhotoIndex={setPhotoIndex}
          />
        ) : null}
      </SwipeablePanel>
      <NavigationMenu
        isVisible={modalMenuShow}
        onClose={() => setModalMenuShow(false)}
      />
    </View>
  );
};

export default MapScreen;
