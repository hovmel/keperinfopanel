import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {styles} from './styles';
import {JackStatuses, jackTariff} from '../../Constants/API';
import useTranslation, {translate} from '../../Translations';
import {getLastSession, saveSession} from '../../Utils/Storage';
import {getFormattedTimeNow} from '../../Utils/Date';
import SimpleSwitch from '../SimpleSwitch';
import {changeControls, getJacks} from '../../Utils/API/Devices';
import {addSession} from '../../Utils/API/Sessions';
import Colors from '../../Constants/Colors';

type Props = {
  keyToGetKilowatts: number;
  header: string;
  text?: string;
  deviceId: string;
  switchId: string;
  jackIdIncrement?: boolean;
  initialValue?: boolean;
  deviceName?: string;
};

const ManageItem: React.FC<Props> = ({
  keyToGetKilowatts,
  header,
  text,
  deviceId,
  switchId,
  jackIdIncrement = false,
  initialValue = false,
  deviceName = '',
}) => {
  const countdownSeconds: number = 13;
  const [switchValue, setSwitchValue] = useState<boolean>(initialValue);
  const [countdown, setCountdown] = useState<number>(0);
  const [isInit, setIsInit] = useState<boolean>(true);
  const {t} = useTranslation();

  useEffect(() => {
    if (isInit) {
      // TODO fix; if close screen, init will be true and you can change status fast
      setIsInit(false);
      console.log('init, return');
      return;
    }
    console.log('Set timer');
    setCountdown(countdownSeconds);
    let interval = setInterval(() => {
      setCountdown(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchValue]);

  useEffect(() => {
    setSwitchValue(initialValue);
  }, [initialValue]);

  const getCurrentKilowattsUse = async (): Promise<number> => {
    let jacksFullData = await getJacks(deviceId);
    if (keyToGetKilowatts < 0 || keyToGetKilowatts > 2) {
      console.warn('current kilowatts use is undefined');
      return 0;
    }
    const kilowattsUsing = jacksFullData.telemetry;
    return parseFloat(kilowattsUsing[keyToGetKilowatts]);
  };

  const handleSession = (isSwitchOn: boolean) => {
    if (isSwitchOn) {
      getCurrentKilowattsUse().then(kilowatts => {
        const dataToSave = {
          deviceId: deviceId,
          switchId: switchId,
          sessionStart: getFormattedTimeNow(),
          usedKilowatts: kilowatts,
        };
        saveSession(dataToSave).then(success =>
          console.log('session saved', success, 'data: ', dataToSave),
        );
      });
    } else {
      getLastSession(deviceId, switchId).then(session => {
        let sessionStart = '';
        let kilowatts = 0;

        if (session) {
          sessionStart = session.sessionStart;
          // TODO crutch with delayed kilowatts request
          // kilowatts = session.usedKilowatts;
        }
        getCurrentKilowattsUse().then(totalKilowatts => {
          let kilowattsDifference = totalKilowatts - kilowatts;
          console.log('current kilowatts use', totalKilowatts);
          console.log('kilowatts on start session: ', kilowatts);

          // crutch with jack numeric
          const newSwitchId = jackIdIncrement
            ? parseInt(switchId, 10) + 1
            : switchId;
          console.log('adding session to ', deviceName);
          addSession(
            sessionStart,
            getFormattedTimeNow(),
            kilowattsDifference,
            kilowattsDifference * jackTariff,
            deviceId,
            newSwitchId,
            deviceName,
          )
            .then(success => {
              if (success) {
                console.log('session appended');
              } else {
                console.log('session was not appended');
              }
            })
            .catch(error => console.warn(error));
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.header, switchValue && {color: Colors.main}]}>
          {header}
        </Text>
        {text && <Text style={styles.text}>{text}</Text>}
      </View>

      <SimpleSwitch
        disabled={countdown > 0}
        // @ts-ignore
        switchDefaultValue={switchValue}
        onChange={() => {
          const status =
            switchValue !== true ? JackStatuses.ON : JackStatuses.OFF;

          changeControls(deviceId, switchId, status).then(success => {
            if (!success) {
              Alert.alert(t('warning'), t('status_not_changed'));
              console.log('coil status has not been changed', success, status);
            } else {
              handleSession(!switchValue);
            }
          });
          setSwitchValue(!switchValue);
        }}
      />
    </View>
  );
};

export default ManageItem;
