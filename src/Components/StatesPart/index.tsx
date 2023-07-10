import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import useTranslation, {
  getCurrentLanguage,
  translate,
} from '../../Translations';
import moment from 'moment';
import getFormattedTime from '../../Utils/getFormattedTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {setActiveObjectSelector} from '../../models/markers/selectors';

if (getCurrentLanguage() === 'ru') {
  require('moment/locale/ru');
  moment.locale('ru');
}

const StatesPart: React.FC = ({states = [], statesInfo = []}) => {
  const [countryCode, setCountryCode] = useState();
  const activeObject = useSelector(setActiveObjectSelector);
  const {t} = useTranslation();

  useEffect(() => {
    (async () => {
      const code = await AsyncStorage.getItem('country_code');
      setCountryCode(code);
    })();
  }, []);

  const findFieldName = field => {
    const fieldName =
      statesInfo?.length &&
      statesInfo[0]?.Fields.find(item => item.Field === field)?.Name;
    return fieldName || field;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{states?.Name || activeObject?.Name}</Text>
      <Text style={styles.lastUpdated}>
        {!!countryCode && getFormattedTime(states[0]?.TS, countryCode)}
      </Text>
      {/*      {lastState[0]?.TS && lastState[0]?.TelemetryState?.Telemetry && (
        <>
          <Text style={styles.lastUpdated}>
            {getFormattedTime(lastState[0]?.TS, countryCode)}
          </Text>
          {lastState[0]?.TelemetryState?.Telemetry &&
            Object.keys(lastState[0]?.TelemetryState?.Telemetry).map(
              (key, index) => (
                <View style={styles.stateItem} key={index}>
                  <Text style={styles.stateItemTitle}>{translate(key)}</Text>
                  <Text style={styles.stateItemText}>
                    {lastState[0]?.TelemetryState?.Telemetry[key]}
                  </Text>
                </View>
              ),
            )}
        </>
      )}*/}
      {states && states[0] && states[0].Telemetry ? (
        Object.keys(states[0]?.Telemetry).map((key, index) => (
          <View style={styles.stateItem} key={index}>
            <Text style={styles.stateItemTitle}>{findFieldName(key)}</Text>
            <Text style={styles.stateItemText}>{states[0].Telemetry[key]}</Text>
          </View>
        ))
      ) : (
        <Text>{t('no_data')}</Text>
      )}
    </View>
  );
};

export default StatesPart;
