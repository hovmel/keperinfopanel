import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
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
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {
  addBoardToStorage,
  addWidgetToStorage,
  getAllBoards,
} from './workWiithLocaleStorage';
import Colors from '../../Constants/Colors';
import GraphCard from '../../Components/GraphCard';
import TableCard from '../../Components/TableCard';
import BoardsControlModal from './components/BoardsControlModal';
import AddBoardModal from './components/AddBoardModal';
import ChooseObject from '../ChooseObject';
import ChooseObjectModal from './components/ChooseObjectModal';
import AllBoardsModal from './components/AllBoardsModal';
import AddWidgetModal from './components/AddWidgetModal';
import {getStates, getStatesByObjectId} from '../../Utils/API/States';
import _ from 'lodash';
import {getBoards, getWidgets} from '../../Utils/API/Dashboards';
import SingleWidget from './components/SingleWidget';
import BackArrow from '../../../assets/icons/left-arrow.png';
import getFromTo from '../../Utils/getFromTo';

const DashboardScreen = () => {
  const [activeScreen, setActiveScreen] = useState<string>('graphs');
  const [buttons, setButtons] = useState<Array<Object>>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [chosenObject, setChosenObject] = useState(null);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<string>('today');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [dateFromCalendar, setDateFromCalendar] = useState<Date>(new Date());

  const [statesLoading, setStatesLoading] = useState<boolean>(false);
  const [statesList, setStatesList] = useState<Array<Object>>([]);
  const [activeBoardStates, setActiveBoardStates] = useState<Array<Object>>([]);

  const [boards, setBoards] = useState<Array<Board>>([]);
  const [activeBoard, setActiveBoard] = useState<Board>();
  const [widgets, setWidgets] = useState<Board>();
  const [showBoardsControlPanel, setShowBoardsControlPanel] =
    useState<boolean>(false);
  const [showAddBoardPanel, setShowAddBoardPanel] = useState<boolean>(false);
  const [showChoseObject, setShowChoseObject] = useState<boolean>(false);
  const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(false);
  const [showAllBoards, setShowAllBoards] = useState<boolean>(false);
  const [showAddWidgetPanel, setShowAddWidgetPanel] = useState<boolean>(false);

  const [newBoardName, setNewBoardName] = useState<string>('');
  const [newWidgetName, setNewWidgetName] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const {t} = useTranslation();

  const [to, setTo] = useState(
    moment().add(1, 'days').format('YYYY-MM-DDT09:00:00') + '.00Z',
  );
  const [from, setFrom] = useState('');

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const graphPressed = () => {
    setActiveScreen('graphs');
  };

  const columnPressed = () => {
    setActiveScreen('column');
  };

  const addPressed = () => {
    setActiveScreen('add_widget');
  };

  const gradientPressed = () => {
    setActiveScreen('gradient_table');
  };

  const downloadPressed = () => {
    setActiveScreen('download');
  };

  const objectPressed = (item = undefined) => {
    setChosenObject(item);
    setShowChoseObject(false);
  };

  const openBoardsDropdown = () => {
    setShowAllBoards(true);
  };
  const openBoardsPanel = () => {
    setShowBoardsControlPanel(true);
  };

  const addBoardPanel = () => {
    setShowBoardsControlPanel(false);
    setShowAddBoardPanel(true);
  };

  const editBoard = () => {};
  const deleteBoard = () => {};
  const addWidgetPanel = async () => {
    const isBoards = await getAllBoards();
    if (!isBoards.length) {
      return Alert.alert('Error', 'You do not have any boards');
    }
    setShowBoardsControlPanel(false);
    setShowAddWidgetPanel(true);
  };

  const choseObject = () => {
    setShowChoseObject(true);
  };

  const choseBoard = async (val: Board) => {
    setActiveBoard(val);
    const widgets = await getWidgets(val.Id);
    setWidgets(widgets);
  };

  const addBoard = async () => {
    const status = await addBoardToStorage(newBoardName, chosenObject);
    if (!status) {
      return Alert.alert(
        'Error',
        `Board with name ${newBoardName} already exists`,
      );
    }
    setShowAddBoardPanel(false);
    setNewBoardName('');
    setChosenObject(null);
    await getBoards();
  };

  const addWidget = async () => {
    const params = activeBoardStates.filter(item => item.chosen);
    const status = await addWidgetToStorage(
      activeBoard.name,
      newWidgetName,
      params,
    );
    if (!status) {
      return Alert.alert(
        'Error',
        `Widget with name ${newWidgetName} already exists`,
      );
    }
    setShowAddWidgetPanel(false);
    setNewWidgetName('');
    await getBoards();
  };

  const statePressed = state => {
    const item = activeBoardStates.find(item => item === state);
    item.chosen = !item.chosen;
    setActiveBoardStates([...activeBoardStates]);
  };

  useEffect(() => {
    setAddButtonDisabled(!newBoardName || !chosenObject);
  }, [newBoardName, chosenObject]);

  /*  const starPressed = item => {
    item.isFavorite = !item.isFavorite;
  };*/

  const dateSelected = (val: string) => {
    setDateFilter(val);
    const [from] = getFromTo(val);

    setFrom(from);
  };

  useEffect(() => {
    dateSelected('today');
  }, []);

  const selectedDateFromCalendar = (val: string) => {
    setDateFilter('calendar');
    setDateFromCalendar(new Date(val));
  };

  useEffect(() => {
    (async () => {
      const boards = await getBoards();
      setBoards(boards);
    })();
    setButtons([
      {
        name: 'graphs',
        disabled: false,
        onPress: graphPressed,
        mainImageSource: require('../../../assets/icons/Graph.png'),
        activeImageSource: require('../../../assets/icons/Graph_blue.png'),
      },
      {
        name: 'column',
        disabled: true,
        onPress: columnPressed,
        mainImageSource: require('../../../assets/icons/Column-chart.png'),
        activeImageSource: require('../../../assets/icons/Column-chart_blue.png'),
      },
      {
        name: 'infotable',
        disabled: true,
        onPress: addWidgetPanel,
        mainImageSource: require('../../../assets/icons/infotable.png'),
        activeImageSource: require('../../../assets/icons/infotable.png'),
      },
    ]);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(
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
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={goBack}
            activeOpacity={0.5}>
            <Image source={BackArrow} style={styles.backArrow} />
          </TouchableOpacity>
          <View style={styles.boardsPanel}>
            {!boards.length ? (
              <View style={[styles.boardsDropdown, styles.nonActive]}>
                <Text style={styles.boardsDropdownText}>{t('no_boards')}</Text>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.boardsDropdown}
                onPress={openBoardsDropdown}>
                <Text style={styles.boardsDropdownText}>
                  {activeBoard?.Name || t('chose_board')}
                </Text>
                <Image
                  source={require('../../../assets/icons/arrow_down.png')}
                  style={styles.dropDownArrow}
                />
              </TouchableOpacity>
            )}
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.6}
            style={styles.boardsControl}
            onPress={openBoardsPanel}>
            <Image
              source={require('../../../assets/icons/menu.png')}
              style={styles.menu}
            />
          </TouchableOpacity>*/}
        </View>

        <DateFilters
          activeFilter={dateFilter}
          setActiveFilter={dateSelected}
          dateFromCalendar={dateFromCalendar}
        />

        <ScrollView
          style={styles.contentWrapper}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {statesLoading ? (
            <View style={styles.loadingView}>
              <ActivityIndicator size={'large'} color={Colors.main} />
            </View>
          ) : activeScreen === 'graphs' ? (
            widgets?.length &&
            widgets.map(item => (
              <SingleWidget
                key={item.Id}
                widget={item}
                board={activeBoard}
                to={to}
                from={from}
                refresh={refreshing}
              />
            ))
          ) : (
            /*statesList ? (
              statesList.map((item, index) =>
                item.length === 2 ? (
                  <GraphCard dataList={item} key={index + '$'} />
                ) : null,
              )
            ) : null*/
            <Text>Page under construction</Text>
          )}
        </ScrollView>
        <BottomMenu
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
          buttons={buttons}
          style={styles.buttons}
          width={'25%'}
        />
      </View>

      <BoardsControlModal
        isVisible={showBoardsControlPanel}
        controlFunction={setShowBoardsControlPanel}
        addBoard={addBoardPanel}
        editBoard={editBoard}
        deleteBoard={deleteBoard}
        addWidget={addWidgetPanel}
      />
      <AddBoardModal
        isVisible={showAddBoardPanel}
        controlFunction={setShowAddBoardPanel}
        newBoardName={newBoardName}
        setNewBoardName={setNewBoardName}
        chosenObject={chosenObject}
        setChosenObject={setChosenObject}
        choseObject={choseObject}
        add={addBoard}
        addButtonDisabled={addButtonDisabled}
      />
      <ChooseObjectModal
        isVisible={showChoseObject}
        choseObject={objectPressed}
        controlFunction={setShowChoseObject}
      />
      <AllBoardsModal
        isVisible={showAllBoards}
        boardsList={boards}
        controlFunction={setShowAllBoards}
        activeBoard={activeBoard}
        setActiveBoard={(val: Board) => {
          choseBoard(val);
          setShowAllBoards(false);
        }}
      />
      <AddWidgetModal
        isVisible={showAddWidgetPanel}
        controlFunction={setShowAddWidgetPanel}
        newWidgetName={newWidgetName}
        setNewWidgetName={setNewWidgetName}
        statesList={activeBoardStates}
        statePressed={statePressed}
        add={addWidget}
      />
    </>
  );
};

interface Board {
  Name: string;
  Id: string;
}

interface Widget {
  name: string;
  states: Array<string>;
}

export default DashboardScreen;
