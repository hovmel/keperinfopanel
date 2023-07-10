import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import ColumnsImage from '../../../assets/icons/Columns.png';
import SortByImage from '../../../assets/icons/SortBy.png';
import TickImage from '../../../assets/icons/tick.png';
import MyModal from '../../Screens/DashboardScreen/components/MyModal';
import Arrow from '../../../assets/icons/left-arrow.png';
import Colors from '../../Constants/Colors';
import DateFilters from '../DateFilters';
import useTranslation from '../../Translations';

const EventsPart: React.FC = ({
  events,
  sortEvents,
  loading,
  range,
  changeRange,
}) => {
  const [columns, setColumns] = useState(events);
  const [isColumnsModalVisible, setColumnsModalVisible] = useState(false);
  const [sortType, setSortType] = useState(1);
  const {t} = useTranslation();

  const openColumnsModal = () => {
    setColumnsModalVisible(true);
  };

  const handleSortType = () => {
    sortEvents(sortType === 1 ? 2 : 1);
    setSortType(prev => (prev === 1 ? 2 : 1));
  };

  useEffect(() => {
    setColumns(events);
  }, [events]);

  const closeColumnsModal = () => {
    setColumnsModalVisible(false);
  };

  const changeChecked = index => {
    columns[index].isChecked = !columns[index].isChecked;
    setColumns([...columns]);
  };

  const _renderModalItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.modalButton}
      activeOpacity={0.7}
      onPress={() => changeChecked(index)}>
      <View style={[styles.checkbox, item.isChecked && styles.activeCheckbox]}>
        {item.isChecked && (
          <Image style={styles.checkboxInner} source={TickImage} />
        )}
      </View>
      <Text style={styles.modalText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const _renderColumnItemRow = (item, key) => (
    <Text key={key} style={styles.columnText}>
      {item}
    </Text>
  );

  const _renderListItem = ({item, index}) =>
    item.isChecked ? (
      <View style={styles.columnItem}>
        <Text style={[styles.columnText, styles.columnTitle]}>{item.name}</Text>
        <View>
          {item?.data.map((item2, index2) =>
            _renderColumnItemRow(item2, item.name + index + item2 + index2),
          )}
        </View>
      </View>
    ) : null;

  return (
    <View style={styles.container}>
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          onPress={openColumnsModal}
          activeOpacity={0.6}
          style={[styles.button, styles.border]}>
          <Image source={ColumnsImage} style={styles.buttonImage} />
          <Text style={styles.buttonText}>{t('columns')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleSortType}>
          <Image source={SortByImage} style={styles.buttonImage} />
          <Text style={styles.buttonText}>{t('sort_by')}</Text>
          <Image
            source={Arrow}
            style={[styles.arrow, sortType === 2 && styles.upArrow]}
          />
        </TouchableOpacity>
      </View>
      <DateFilters
        spaceBetween
        activeFilter={range}
        setActiveFilter={val => {
          changeRange(val);
          setSortType(1);
        }}
      />

      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.main}
          style={{marginTop: 30}}
        />
      ) : columns?.length ? (
        <FlatList
          data={[]}
          renderItem={() => <></>}
          ListHeaderComponent={
            <FlatList
              nestedScrollEnabled
              style={styles.columnList}
              data={columns}
              horizontal
              renderItem={_renderListItem}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.name}
            />
          }
        />
      ) : (
        <Text>{t('no_data')}</Text>
      )}

      <MyModal
        closeFunction={closeColumnsModal}
        isVisible={isColumnsModalVisible}>
        <FlatList
          style={styles.modalWrapper}
          data={columns}
          renderItem={_renderModalItem}
          keyExtractor={item => item.name}
        />
      </MyModal>
    </View>
  );
};

export default EventsPart;
