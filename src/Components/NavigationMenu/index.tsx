import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {translate} from '../../Translations';
import {jackTariff} from '../../Constants/API';
const SessionItem = ({session}) => {
  const [deviceName, setDeviceName] = useState('');

  useEffect(() => {
    if (!session) {
      setDeviceName(translate('device'));
      return;
    }
    let tmpDeviceName = session.PROPERTY_NAME_DEVICE_VALUE;
    tmpDeviceName = tmpDeviceName ? tmpDeviceName : translate('device');
    setDeviceName(tmpDeviceName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extractDate = sessionDate => {
    if (sessionDate) {
      let date = sessionDate.split(' ');
      if (date.length > 0) {
        return date[0];
      }
    }
    return '';
  };
  const extractTime = sessionDate => {
    if (sessionDate) {
      let date = sessionDate.split(' ');
      if (date.length > 1) {
        return date[1];
      }
    }
    return translate('not_set');
  };
  const validKilowatts = kilowatts => {
    if (!kilowatts) {
      return 0;
    }
    return kilowatts;
  };

  const getBeautifulPrice = (tariff, price) => {
    if (!tariff || !price) {
      return '-';
    }
    return (tariff * price).toFixed(2) + ' ';
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.orderVerticalContainer}>
        <View style={styles.horizontalContainer}>
          <Text style={styles.orderDate}>
            {extractDate(session.PROPERTY_START_SESSION_VALUE)}
          </Text>
          <Text style={styles.orderDate}>
            {extractTime(session.PROPERTY_START_SESSION_VALUE) +
              ' - ' +
              extractTime(session.PROPERTY_STOP_SESSION_VALUE)}
          </Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.orderStatus}>
            {translate('total_used') + ':'}
          </Text>
          <Text style={styles.usedText}>
            {validKilowatts(session.PROPERTY_KWAT_VALUE) + ' '}
          </Text>
          <Text style={styles.orderStatus}>{translate('kilowatts')}</Text>
        </View>

        <View style={styles.horizontalContainer}>
          <View style={styles.horizontalContainer}>
            <Text style={styles.orderStatus}>{translate('tariff') + ':'}</Text>
            <Text style={styles.darkText}>{jackTariff + ' '}</Text>
            <Text style={styles.darkText}>{translate('rub_per_kwt')}</Text>
          </View>
          <View style={styles.delimiterSpace} />
          <View style={styles.horizontalContainer}>
            <Text style={styles.orderStatus}>{translate('cost') + ':'}</Text>
            <Text style={styles.darkText}>
              {getBeautifulPrice(jackTariff, session.PROPERTY_PRICE_VALUE)}
            </Text>
            <Text style={styles.darkText}>{translate('rub')}</Text>
          </View>
        </View>

        <View style={styles.horizontalContainer}>
          <Text style={styles.orderStatus}>
            {(deviceName ? deviceName : translate('device')) + ':'}
          </Text>
          <Text style={styles.darkText}>
            {session.PROPERTY_ID_DEVICE_VALUE.slice(0, 8)}
          </Text>

          <View style={styles.delimiterSpace} />

          <Text style={styles.orderStatus}>{translate('jack_id') + ':'}</Text>
          <Text style={styles.darkText}>{session.PROPERTY_JACKS_VALUE}</Text>
        </View>
      </View>
    </View>
  );
};

export default SessionItem;
