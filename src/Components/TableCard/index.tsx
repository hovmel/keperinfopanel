import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {styles} from './styles';
import moment from 'moment';
import data from '../../Screens/StatesScreen/data';
import ColumnsImage from '../../../assets/icons/Columns.png';
import MyModal from '../../Screens/DashboardScreen/components/MyModal';
import TickImage from '../../../assets/icons/tick.png';
import ArrowDown from '../../../assets/icons/arrow_down.png';
import ArrowUp from '../../../assets/icons/arrow_up.png';

const TableCard = ({
  dataList,
  setLoading,
}: {
  dataList: Array<any>;
  setLoading: (val: boolean) => void;
}) => {
  const [dataToDraw, setDataToDraw] = useState([]);
  const [namesToDraw, setNamesToDraw] = useState([]);
  const [deletedNames, setDeletedNames] = useState([]);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [filter, setFilter] = useState({name: 'Date', type: 'asc'});

  const renderCellItem = (item: any, rowIndex: Number, lastIndex: Number) => {
    return (
      <View style={[styles.item, rowIndex === lastIndex && styles.noBorder]}>
        <Text style={styles.itemText}>
          {typeof item === 'string'
            ? moment(item).format('DD.MM.YYYY HH:mm:SS')
            : item}
        </Text>
      </View>
    );
  };

  const renderColumnItem = ({item, index}: {item: any; index: Number}) =>
    !isNameDeleted(item.name) && (
      <View
        style={[
          styles.column,
          index === dataList.length - 1 && styles.noBorder,
        ]}>
        <TouchableOpacity
          style={[styles.item, styles.header]}
          onPress={() => titlePressed(item.name)}>
          <Text style={styles.headerText}>
            {item.name} {item.measureType && `(${item.measureType})`}
          </Text>
          {item.name === filter.name && (
            <Image
              source={filter.type === 'asc' ? ArrowDown : ArrowUp}
              style={styles.filterArrow}
            />
          )}
        </TouchableOpacity>
        <FlatList
          data={item.data}
          keyExtractor={(cellItem, rowIndex) => 'row' + index + rowIndex}
          renderItem={({
            item: dataItem,
            index: rowIndex,
          }: {
            item: Number;
            index: Number;
          }) => renderCellItem(dataItem, rowIndex, item.data.length - 1)}
        />
      </View>
    );

  const renderNameItem = ({item, index}) => {
    const isDeleted = isNameDeleted(item);
    return (
      <TouchableOpacity
        style={styles.modalButton}
        activeOpacity={0.7}
        onPress={() => {
          if (isDeleted) {
            setDeletedNames(prev => prev.filter(item2 => item2 !== item));
          } else {
            setDeletedNames(prev => [...prev, item]);
          }
        }}>
        <View style={[styles.checkbox, !isDeleted && styles.activeCheckbox]}>
          {!isDeleted && (
            <Image style={styles.checkboxInner} source={TickImage} />
          )}
        </View>
        <Text style={styles.modalText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const isNameDeleted = name => {
    for (const item of deletedNames) {
      if (item === name) {
        return true;
      }
    }
    return false;
  };

  const titlePressed = title => {
    const newFilter = {name: title, type: 'asc'};
    if (filter.name === title) {
      newFilter.type = filter.type === 'asc' ? 'desc' : 'asc';
    }

    const sortedData = dataList.sort((first, second) => {
      return newFilter.type === 'asc'
        ? first[title] < second[title]
          ? -1
          : 1
        : first[title] < second[title]
        ? 1
        : -1;
    });

    convertData(sortedData);

    setFilter(newFilter);
  };

  const convertData = data => {
    const obj = {};

    data?.forEach(item => {
      Object.keys(item).forEach(key => {
        if (obj[key]) {
          obj[key].push(item[key]);
        } else {
          obj[key] = [item[key]];
        }
      });
    });

    const arr = [];
    const names = [];
    Object.keys(obj).forEach(key => {
      arr.push({
        name: key,
        data: obj[key],
      });
      names.push(key);
    });

    setNamesToDraw(names);
    setDataToDraw(arr);
  };

  useEffect(() => {
    if (dataList?.length) {
      convertData(dataList);
    }
  }, [dataList]);

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.edit}
        onPress={() => setEditModalVisible(true)}
        activeOpacity={0.6}>
        <Image source={ColumnsImage} style={styles.editIcon} />
      </TouchableOpacity>
      <FlatList
        data={dataToDraw}
        renderItem={renderColumnItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.name}
      />
      <MyModal isVisible={isEditModalVisible} closeFunction={closeEditModal}>
        <FlatList
          style={styles.modalWrapper}
          data={namesToDraw}
          renderItem={renderNameItem}
          keyExtractor={item => item.name}
        />
      </MyModal>
    </View>
  );
};

export default TableCard;
