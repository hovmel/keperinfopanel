import {Image, Text, TouchableOpacity, View} from 'react-native';
import {translate} from '../../Translations';
import SimpleSwitch from '../SimpleSwitch';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';

const FilterItem = ({
  iconSource,
  name,
  setMapFilters,
  mapFilters,
  filterValue,
  onChange,
}) => {
  const countdownSeconds = 3;
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (filterValue) {
      setCountdown(countdownSeconds);
      let interval = setInterval(() => {
        setCountdown(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [filterValue]);

  return (
    <View style={styles.itemContainer}>
      <Image style={styles.icon} source={iconSource} />
      <Text style={styles.itemText}>{name}</Text>
      <SimpleSwitch
        disabled={countdown}
        switchDefaultValue={filterValue}
        onChange={() => onChange()}
      />
      {countdown ? (
        <Text style={[styles.itemText, {marginLeft: 10}]}>{countdown}</Text>
      ) : undefined}
    </View>
  );
};

export const MapFilterOverlay = ({mapFilters, setMapFilters, closeOverlay}) => {
  return (
    <View style={styles.filterContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{translate('map_filters')}</Text>
        <TouchableOpacity
          style={styles.closeContainer}
          onPress={() => closeOverlay()}>
          <Image
            source={require('../../../assets/icons/close.png')}
            style={styles.closeImg}
          />
        </TouchableOpacity>
      </View>
      <FilterItem
        name={translate('show_plugshare')}
        iconSource={require('../../../assets/icons/marker_green.png')}
        mapFilters={mapFilters}
        setMapFilters={setMapFilters}
        filterValue={mapFilters.showPlugShare}
        onChange={() => {
          setMapFilters({
            ...mapFilters,
            showPlugShare: !mapFilters.showPlugShare,
          });
        }}
      />
      <FilterItem
        name={translate('show_only_clever_devices')}
        iconSource={require('../../../assets/icons/SocketIc.png')}
        mapFilters={mapFilters}
        setMapFilters={setMapFilters}
        filterValue={mapFilters.showOnlyJacks}
        onChange={() => {
          setMapFilters({
            ...mapFilters,
            showOnlyJacks: !mapFilters.showOnlyJacks,
          });
        }}
      />
    </View>
  );
};
