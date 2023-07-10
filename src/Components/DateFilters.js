import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import useTranslation, {translate} from '../Translations';
import Colors from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {capitalize} from 'lodash';
import moment from 'moment';

const filters = ['today', 'yesterday', 'last_week', 'last_month'];

const DateFilters = ({
  activeFilter,
  setActiveFilter,
  dateFromCalendar,
  spaceBetween,
}) => {
  const {t} = useTranslation();

  const formatDate = date => {
    return date ? moment(date).format('DD-MM-YY') : moment().format('DD-MM-YY');
  };

  return (
    <View
      style={[
        styles.filterRow,
        spaceBetween && {justifyContent: 'space-between', paddingHorizontal: 0},
      ]}>
      {filters.map(item => (
        <TouchableOpacity
          key={item}
          style={styles.filterItem}
          activeOpacity={0.6}
          onPress={() => setActiveFilter(item)}>
          <Text
            style={[
              styles.filterItemText,
              activeFilter === item && styles.active,
            ]}>
            {t(item)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  filterItem: {
    marginRight: 10,
  },
  filterItemText: {
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    color: Colors.lightGray,
    fontSize: 12,
    fontFamily: Fonts.mediumFontFamily,
  },
  active: {
    borderColor: Colors.main,
    color: Colors.white,
    backgroundColor: Colors.main,
  },
});

export default DateFilters;
