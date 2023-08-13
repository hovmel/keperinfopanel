import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl, SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomMenu from '../../Components/BottomMenu';
import {ScreensHeader} from '../../Components/ScreensHeader';
import {styles} from './styles';
import useTranslation, {translate} from '../../Translations';
import {SwipeablePanel} from 'rn-swipeable-panel';
import DateFilters from '../../Components/DateFilters';
import FiltersTrigger from '../../Components/FiltersTrigger';
import {useNavigation} from '@react-navigation/native';
import StarYellow from '../../../assets/icons/favorite_active.png';
import Star from '../../../assets/icons/favorite.png';
import GraphCard from '../../Components/GraphCard';
import {getStates} from '../../Utils/API/States';
import moment from 'moment';
import Colors from '../../Constants/Colors';
import TableCard from '../../Components/TableCard';
import DatePicker from 'react-native-date-picker';
import useActiveObject from '../../hooks/useActiveObject';
import {getDeviceStatus, getObjectControls} from '../../Utils/API/Devices';
import getFromTo from '../../Utils/getFromTo';

type DeviceStatuses =
  | 'Off'
  | 'On'
  | 'Disable'
  | 'Disconnect'
  | 'Error'
  | 'Warning';

const StatusesData = {
  Off: {
    condition: 'Off',
    color: '#313131',
  },
  On: {
    condition: 'On',
    color: '#2fff00',
  },
  Disable: {
    condition: 'Off',
    color: '#313131',
  },
  Disconnect: {
    condition: 'Off',
    color: '#313131',
  },
  Error: {
    condition: 'On',
    color: '#b20000',
  },
  Warning: {
    condition: 'On',
    color: '#f3c800',
  },
};

const Index = () => {
  const [activeScreen, setActiveScreen] = useState<string>('graphs');
  const [buttons, setButtons] = useState<Array<Object>>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [chosenObject, setChosenObject] = useActiveObject();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<string>('today');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [dateFromCalendar, setDateFromCalendar] = useState<Date>(new Date());
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatuses>('Off');
  const [controlValues, setControlValues] = useState();

  const [statesLoading, setStatesLoading] = useState<boolean>(false);
  const [statesChunks, setStatesChunks] = useState<Array<Array<Object>>>([]);
  const [statesList, setStatesList] = useState<Array<Object>>([]);
  const [refreshing, setRefreshing] = useState(false);

  const {t} = useTranslation();

  const navigation = useNavigation();

  const graphPressed = () => {
    setActiveScreen('graphs');
  };

  const tablePressed = () => {
    setActiveScreen('table');
  };

  const addPressed = () => {
    setActiveScreen('add');
  };

  const columnsPressed = () => {
    setActiveScreen('columns');
  };

  const downloadPressed = () => {
    setActiveScreen('download');
  };

  const choseObject = () => {
    navigation.navigate('ChooseObject', {singleObjectPressed: objectPressed});
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      objectPressed(chosenObject).then(() => {});
      setRefreshing(false);
    }, 1000);
  }, [chosenObject]);

  const objectPressed = async (item = undefined) => {
    navigation.navigate('States');
    const [from, to] = getFromTo(dateFilter);

    if (!item) {
      item = chosenObject;
    } else {
      setChosenObject(item);
    }

    setStatesLoading(true);
    setStatesChunks([]);
    setStatesList([]);
    if (!item?.ProviderType) {
      setStatesLoading(false);
      return;
    }

    const [statesChunksData, statesListData] = await getStates(
      item.Id,
      from,
      to,
      false,
      item?.ProviderType,
      item?.DeviceType,
    );

    console.log('data got', statesChunksData?.length, statesListData?.length);

    if (statesChunksData?.length) {
      setStatesChunks(statesChunksData);
    }
    if (statesListData?.length) {
      setStatesList(statesListData);
    }

    setStatesLoading(false);
  };

  const starPressed = item => {
    item.isFavorite = !item.isFavorite;
  };

  const dateSelected = (val: string) => {
    if (val === 'calendar') {
      setShowCalendar(true);
    } else {
      setDateFilter(val);
    }
  };

  const selectedDateFromCalendar = (val: string) => {
    setDateFilter('calendar');
    setDateFromCalendar(new Date(val));
  };

  useEffect(() => {
    setButtons([
      {
        name: 'graphs',
        disabled: false,
        onPress: graphPressed,
        mainImageSource: require('../../../assets/icons/Graph.png'),
        activeImageSource: require('../../../assets/icons/Graph_blue.png'),
      },
      {
        name: 'table',
        disabled: false,
        onPress: tablePressed,
        mainImageSource: require('../../../assets/icons/Table.png'),
        activeImageSource: require('../../../assets/icons/Table_blue.png'),
      },
      /*      {
        name: 'add',
        disabled: false,
        onPress: addPressed,
        mainImageSource: require('../../../assets/icons/Add.png'),
        activeImageSource: require('../../../assets/icons/Add_blue.png'),
      },
      {
        name: 'columns',
        disabled: false,
        onPress: columnsPressed,
        mainImageSource: require('../../../assets/icons/Column.png'),
        activeImageSource: require('../../../assets/icons/Column_blue.png'),
      },
      {
        name: 'download',
        disabled: false,
        onPress: downloadPressed,
        mainImageSource: require('../../../assets/icons/Download.png'),
        activeImageSource: require('../../../assets/icons/Download_blue.png'),
      },*/
    ]);
  }, []);

  /*  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();

        if (showFilter) {
          setShowFilter(false);
          return true;
        }
        navigation.dispatch(e.data.action);
      }),
    [navigation, showFilter],
  );*/

  useEffect(() => {
    if (chosenObject && chosenObject.Id) {
      objectPressed().then(() => {});
    }
  }, [dateFilter, dateFromCalendar]);

  useEffect(() => {
    setDeviceStatus('Off');
    (async () => {
      if (chosenObject.Id) {
        const status = await getObjectControls(chosenObject.Id);
        if (status?.Status) {
          setDeviceStatus(status?.Status);
        }
        if (status?.ControlValues) {
          setControlValues(status?.ControlValues);
        }
      }
    })();
  }, [chosenObject]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreensHeader
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <View style={styles.wrapper}>
          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.3}
              onPress={choseObject}>
              <View style={styles.buttonInner}>
                {!chosenObject.Id ? (
                  <Text style={styles.buttonHeader}>{t('choose_object')}</Text>
                ) : (
                  <View style={styles.buttonWrapper}>
                    <View style={styles.leftPart}>
                      {/*                      <TouchableOpacity
                        style={styles.starView}
                        onPress={() => starPressed(chosenObject)}
                        activeOpacity={0.5}>
                        <Image
                          source={}
                          style={styles.star}
                        />
                      </TouchableOpacity>*/}
                      <View style={styles.infoBlock}>
                        <Text
                          style={styles.objectName}
                          numberOfLines={1}
                          ellipsizeMode={'middle'}>
                          {chosenObject.Name}
                        </Text>
                        <Text style={styles.objectType}>
                          {chosenObject.DeviceType}
                        </Text>
                        <Text style={styles.objectState}>
                          {t('condition')}: {t(deviceStatus)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.conditionBlock}>
                      <View style={styles.conditionRow}>
                        <Text style={styles.onOff}>
                          {t(StatusesData[deviceStatus]?.condition)}
                        </Text>
                        <View
                          style={[
                            styles.circle,
                            {
                              backgroundColor:
                                StatusesData[deviceStatus]?.color,
                            },
                          ]}
                        />
                      </View>
                      {controlValues?.Slider && (
                        <Text style={styles.percentage}>
                          {controlValues.Slider?.Value}%
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.contentWrapper}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {statesLoading ? (
            <View style={styles.loadingView}>
              <ActivityIndicator size={'large'} color={Colors.main} />
            </View>
          ) : !chosenObject?.Id ? (
            <Text>{t('object_not_chosen')}</Text>
          ) : !statesChunks?.length && activeScreen === 'graphs' ? (
            <Text>{t('no_graph_data')}</Text>
          ) : !statesList?.length && activeScreen === 'table' ? (
            <Text>{t('no_data')}</Text>
          ) : activeScreen === 'graphs' ? (
            statesChunks?.map((item, index) => (
              <GraphCard dataList={item} key={index + '$'} />
            ))
          ) : activeScreen === 'table' ? (
            <TableCard setLoading={setStatesLoading} dataList={statesList} />
          ) : (
            <Text>Page under construction</Text>
          )}
        </ScrollView>

        <FiltersTrigger
          onPress={() => setShowFilter(prev => !prev)}
          isOpen={showFilter}
        />
        <BottomMenu
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
          buttons={buttons}
          style={styles.buttons}
        />
        {showFilter && (
          <View style={styles.dateFilters}>
            <DateFilters
              activeFilter={dateFilter}
              setActiveFilter={dateSelected}
              dateFromCalendar={dateFromCalendar}
            />
          </View>
        )}
      </SafeAreaView>
      <DatePicker
        modal
        title={'Starting from:'}
        open={showCalendar}
        mode={'date'}
        date={dateFromCalendar}
        maximumDate={new Date()}
        minimumDate={new Date(new Date().setFullYear(2021))}
        onConfirm={date => {
          setShowCalendar(false);
          selectedDateFromCalendar(date);
        }}
        onCancel={() => {
          setShowCalendar(false);
        }}
      />
    </>
  );
};

export default Index;
