import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {SimpleHeader} from '../../Components/Header/SimpleHeader';
import {translate} from '../../Translations';
import {styles} from './styles';
import SessionItem from '../../Components/NavigationMenu';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/native';
import {extractDateFromSessionItem} from '../../Utils/Date';
import {loadSessions} from '../../Utils/API/Sessions';

const filterTypes = {
  today: 'today',
  week: 'this_week',
  month: 'this_month',
  all: 'all',
};

const SessionsScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [statistics, setStatistics] = useState({
    kilowattsUse: 0,
    rub: 0,
  });

  const filterData = () => {
    const now = new Date();
    if (selectedFilters.length === 0) {
      setFilteredData(data);
      return;
    }

    let tempFilteredData = data.filter(item => {
      let isFit = false;

      selectedFilters.forEach(cur_filter => {
        const itemDate = extractDateFromSessionItem(item);
        if (!itemDate) {
          return;
        }

        switch (cur_filter) {
          case filterTypes.all:
            isFit = true;
            break;
          case filterTypes.today:
            isFit =
              itemDate.getMonth() === now.getMonth() &&
              itemDate.getDate() === now.getDate();
            break;
          case filterTypes.month:
            isFit = itemDate.getMonth() === now.getMonth();
            break;
          case filterTypes.week:
            const previousWeek = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() - 7,
            );
            isFit = itemDate.getTime() >= previousWeek.getTime();
            break;
        }
      });
      return isFit;
    });
    tempFilteredData.sort((a, b) => a.date - b.date);
    setFilteredData(tempFilteredData);
  };

  const handleSessions = () => {
    loadSessions().then(json => {
      if (!json) {
        setData([]);
        return;
      }
      // fix backend bug: if one object -> return one object
      // if multiple objects -> return array
      let tmpData = !json.length ? [json] : json;
      setData(tmpData);

      // Handle statistics
      let totalSum = 0;
      let totalKilowatts = 0;
      tmpData.forEach(item => {
        if (item) {
          totalSum += parseFloat(item.PROPERTY_PRICE_VALUE);
          totalKilowatts += parseFloat(item.PROPERTY_KWAT_VALUE);
        }
      });
      setStatistics({
        kilowattsUse: totalKilowatts,
        rub: totalSum,
      });
    });
    setIsLoading(false);
    console.log('sessions loaded');
  };

  useFocusEffect(
    React.useCallback(() => {
      handleSessions();
    }, []),
  );

  useEffect(() => {
    handleSessions();
  }, []);

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, data]);

  return (
    <View style={styles.container}>
      <SimpleHeader text={translate('sessions_btn')} />
      <SafeAreaView style={{marginBottom: 190}}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.totalContainer}>
            <Image
              source={require('../../../assets/icons/Total_charge.png')}
              style={styles.totalImage}
            />
            <Text style={styles.totalHeader}>
              {translate('already_charged')}
            </Text>
            <Text style={styles.totalText}>
              {statistics?.kilowattsUse.toFixed(2)} {translate('kilowatts')}
            </Text>
            <Text style={styles.totalHeader}>
              {translate('already_charged_sum')}
            </Text>
            <Text style={styles.totalText}>
              {statistics?.rub.toFixed(2)} {translate('rub')}
            </Text>
          </View>
          <Picker
            style={styles.picker}
            selectedValue={selectedFilters[0]}
            onValueChange={itemValue => setSelectedFilters([itemValue])}>
            <Picker.Item label={translate('all')} value={filterTypes.all} />
            <Picker.Item label={translate('today')} value={filterTypes.today} />
            <Picker.Item
              label={translate('this_week')}
              value={filterTypes.week}
            />
            <Picker.Item
              label={translate('this_month')}
              value={filterTypes.month}
            />
          </Picker>

          {filteredData && filteredData.length > 0 ? (
            <SafeAreaView style={styles.safeAreaContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={styles.scrollViewContainer}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => handleSessions()}
                  />
                }>
                {filteredData.map((item, key) => (
                  <SessionItem key={key} session={item} />
                ))}
              </ScrollView>
            </SafeAreaView>
          ) : (
            <Text style={styles.loadingText}>{translate('empty_list')}</Text>
          )}
          <View style={{height: 70}}/>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SessionsScreen;
