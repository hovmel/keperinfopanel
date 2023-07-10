import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {translate} from '../../Translations';
import ManageItem from '../ManageItem';
import {JackStatuses} from '../../Constants/API';
import Toast from 'react-native-toast-message';
import {customToastConfig} from '../../Styles/customToast';
import {getJacks} from '../../Utils/API/Devices';
import {Jack} from './MarkerOverlay.types';
import logger from 'js-to-ts-converter/dist/logger';

type Props = {
  marker: any;
  coils?: Array<Coil>;
  modes: any[];
};

type Coil = {
  itemId: string;
  value: string;
};

const MarkerOverlay: React.FC<Props> = props => {
  const {marker, coils, modes} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [jacks, setJacks] = useState<Jack[]>([]);
  const [kilowatts, setKilowatts] = useState<string[]>([]);
  const [jackStatusNeedModify, setJackStatusNeedModify] = useState(false);

  const setDataFromAPI = (markerId: string) => {
    getJacks(markerId)
      .then(res => {
        // Crutch which fix jack numeration (from 0 to 1)
        const tmpJacks = res.jacks;
        if (tmpJacks?.length > 0 && tmpJacks[0].itemId === '0') {
          setJackStatusNeedModify(true);
        }
        setJacks([...tmpJacks]);
        setKilowatts([...res.telemetry]);
      })
      .catch(error => {
        console.log('loading jacks error', error);
        setJacks([]);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (coils?.length) {
      setJacks(coils);
    } else {
      setDataFromAPI(marker.Id);
      let timer = setInterval(() => {
        setDataFromAPI(marker.Id);
      }, 3000);
      return () => clearInterval(timer);
    }
    setIsLoading(false);
  }, [coils, marker.Id]);

  /*useEffect(() => {
    setDataFromAPI(marker.Id);
    let timer = setInterval(() => {
      setDataFromAPI(marker.Id);
    }, 3000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker.Id]);*/

  const getManageItemHeader = (jack: Jack) => {
    const title = modes?.find(item => item.ItemId === jack.itemId)?.Name;
    return title || 'R' + (+jack.itemId + 1);
  };

  const tryGetKilowatts = (ind: number) => {
    try {
      return kilowatts[ind];
    } catch (error) {
      console.error('getting kilowatts error', error);
      return 0;
    }
  };

  const getManageItemInitial = (jack: Jack) => {
    // TODO fix crutch with statuses, wait backend
    return jack.value === JackStatuses.ON || jack.value === '3';
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View>
          {isLoading ? (
            <Text style={styles.loadingText}>{translate('loading')}</Text>
          ) : (
            <View style={styles.scrollView}>
              {jacks?.map((item, key) => {
                return (
                  <ManageItem
                    key={key}
                    keyToGetKilowatts={key}
                    deviceId={marker.Id}
                    switchId={item.itemId}
                    jackIdIncrement={jackStatusNeedModify}
                    /*text={
                      translate('energy') +
                      ' ' +
                      tryGetKilowatts(key) +
                      ' ' +
                      translate('kilowatts')
                    }*/
                    header={getManageItemHeader(item)}
                    initialValue={getManageItemInitial(item)}
                    deviceName={marker.Name}
                  />
                );
              })}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MarkerOverlay;
