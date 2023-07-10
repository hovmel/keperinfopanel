import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import useTranslation, {
  getCurrentLanguage,
  translate,
} from '../../Translations';
import Colors from '../../Constants/Colors';
import moment from 'moment';

import {Slider} from '@miblanchard/react-native-slider';
import MarkerOverlay from '../MarkerOverlay/MarkerOverlay';
import {
  changeArchMode,
  changeSliderValue,
  getSinglePhoto,
} from '../../Utils/API/Devices';
import getFormattedTime from '../../Utils/getFormattedTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sleep from '../../Utils/sleep';

const ControlPart: React.FC = ({
  controls,
  controlsModes,
  selectedMarker,
  photoIndex,
  photoIds,
  setPhotoIndex,
}) => {
  const [dimmer, setDimmer] = useState<any>([
    controls?.ControlValues?.Slider?.Value / 100 || 0,
  ]);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoUri, setPhotoUri] = useState('');

  const dimmerStep =
    controlsModes?.Slider?.length &&
    controlsModes?.Slider[1]?.Range?.Step / 100;
  const dimmerStart =
    controlsModes?.Slider?.length &&
    controlsModes?.Slider[1]?.Range?.Start / 100;
  const dimmerEnd =
    controlsModes?.Slider?.length && controlsModes?.Slider[1]?.Range?.End / 100;

  const [countryCode, setCountryCode] = useState();
  const [archModeValue, setArchModeValue] = useState(
    controls?.ControlValues?.ArchModes?.ItemId,
  );

  const {t} = useTranslation();

  useEffect(() => {
    (async () => {
      const code = await AsyncStorage.getItem('country_code');
      setCountryCode(code);
    })();
  }, []);

  const changeDimer = (val: any) => {
    if (val[0] < 0.02) {
      val[0] = 0;
    } else if (val[0] >= 0.02 && val[0] < dimmerStart) {
      val[0] = dimmerStart;
    }

    setDimmer(val);
  };

  const plusDimerValue = () => {
    if (dimmer[0] >= dimmerEnd) {
      return;
    }
    let newValue = 0;
    if (dimmer[0] < dimmerStart) {
      newValue = dimmerStart;
    } else {
      newValue = dimmer[0] + dimmerStep;
    }
    setDimmer([newValue]);
    sendDimerValue(newValue).then();
  };

  const minusDimerValue = () => {
    if (dimmer[0] <= 0) {
      return;
    }
    let newValue = 0;
    if (dimmer[0] === dimmerStart) {
      newValue = 0;
    } else {
      newValue = dimmer[0] - dimmerStep;
    }
    setDimmer([newValue]);
    sendDimerValue(newValue).then();
  };

  const sendDimerValue = async (val: any) => {
    const value = isFinite(val)
      ? String(Math.round(val * 100))
      : String(Math.round(dimmer[0] * 100));
    const res = await changeSliderValue(controls.Id, value);
    if (res) {
      controls.ControlValues.Slider.Value = value;
    } else {
      Alert.alert(t('warning'), t('status_not_changed'));
      setDimmer([controls?.ControlValues?.Slider?.Value / 100 || 0]);
    }
  };

  const onArchModePressed = async (val: string) => {
    const res = await changeArchMode(controls.Id, val);
    if (res) {
      setArchModeValue(val);
    }
  };

  const sliderComponent = () => {
    return (
      <View style={styles.controlItem}>
        <Text style={styles.itemTitle}>{translate('dimmer')}</Text>
        <Text style={{alignSelf: 'center'}}>
          {Math.round(dimmer[0] * 100)}%
        </Text>
        <Slider
          value={dimmer[0]}
          onValueChange={changeDimer}
          onSlidingComplete={sendDimerValue}
          maximumTrackTintColor={Colors.lightGray}
          minimumTrackTintColor={Colors.main}
          thumbStyle={{
            width: 15,
            height: 15,
            backgroundColor: Colors.main,
          }}
        />
        <View style={styles.row}>
          <TouchableOpacity
            disabled={dimmer[0] <= 0}
            activeOpacity={0.6}
            onPress={minusDimerValue}
            style={[styles.button, dimmer[0] <= 0 && styles.buttonDisabled]}>
            <Text
              style={[
                styles.buttonText,
                dimmer[0] <= 0 && styles.buttonTextDisabled,
              ]}>
              -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={dimmer[0] >= 1}
            onPress={plusDimerValue}
            style={[styles.button, dimmer[0] >= 1 && styles.buttonDisabled]}>
            <Text
              style={[
                styles.buttonText,
                dimmer[0] >= 1 && styles.buttonTextDisabled,
              ]}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const inputsComponent = () => {
    console.log(controlsModes);
    return (
      <View style={[styles.controlItem, styles.noBorder]}>
        <Text style={styles.itemTitle}>Inputs</Text>
        {controls.ControlValues.Inputs.map((item: any, index: number) => {
          const title = controlsModes?.Inputs?.find(
            item2 => item2.ItemId === item.ItemId,
          )?.Name;
          return (
            <View key={index} style={styles.telemetryItem}>
              <Text style={styles.telemetryText}>
                {title || `I${(+item.ItemId || index) + 1}`}
              </Text>
              <Image
                source={
                  item.Value === '1'
                    ? require('../../../assets/icons/electro_icon.png')
                    : require('../../../assets/icons/electro_icon_non_active.png')
                }
                style={styles.telemetryIcon}
              />
              <View />
            </View>
          );
        })}
      </View>
    );
  };

  const coilsComponent = () => {
    const coils = controls.ControlValues.Coils.map((item: any) => ({
      ...item,
      itemId: item.ItemId,
      value: item.Value,
    }));

    return (
      <View style={styles.controlItem}>
        <Text style={styles.itemTitle}>Coils</Text>
        <MarkerOverlay
          marker={selectedMarker}
          coils={coils}
          modes={controlsModes?.Coils}
        />
      </View>
    );
  };

  const archModesComponent = () => {
    return (
      <View style={styles.archModesRow}>
        {archModesData.map(item => (
          <TouchableOpacity
            onPress={() => onArchModePressed(item.ItemId)}
            activeOpacity={0.6}
            key={item.ItemId}
            style={[
              styles.archModesButton,
              item.ItemId === archModeValue && styles.archModesActive,
            ]}>
            <Text style={styles.archModesText}>{item.Name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const changePhotoIndex = (a: 1 | -1) => {
    if (a === 1) {
      if (photoIndex < photoIds?.length - 1) {
        setPhotoIndex(prev => prev + 1);
      }
    } else {
      if (photoIndex > 0) {
        setPhotoIndex(prev => prev - 1);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (controlsModes?.PhotoType && photoIds?.length) {
        setPhotoLoading(true);
        await sleep(500);
        const currentPhoto = await getSinglePhoto(photoIds[photoIndex].PhotoId);
        setPhotoUri(currentPhoto);
        setPhotoLoading(false);
      }
    })();
  }, [photoIndex, photoIds, controlsModes]);

  const photoSliderComponent = () => {
    return (
      <View style={{marginVertical: 20}}>
        {photoIds[photoIndex]?.TS ? (
          <Text style={styles.photoText}>
            {!!countryCode &&
              getFormattedTime(moment(photoIds[photoIndex]?.TS), countryCode)}
          </Text>
        ) : null}

        <View style={styles.photoView}>
          {photoLoading ? (
            <ActivityIndicator color={Colors.main} />
          ) : !photoUri ? (
            <Text>{t('no_photo')}</Text>
          ) : (
            <Image source={{uri: photoUri}} style={styles.photo} />
          )}
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            disabled={photoIndex <= 0}
            onPress={() => changePhotoIndex(-1)}
            activeOpacity={0.6}
            style={[
              styles.photoButton,
              photoIndex <= 0 && styles.buttonDisabled,
            ]}>
            <Text style={styles.photoText}>{t('prev')}</Text>
          </TouchableOpacity>
          <Text style={styles.photoText}>
            {photoIndex + 1}/{photoIds?.length}
          </Text>
          <TouchableOpacity
            disabled={photoIndex >= photoIds?.length - 1}
            onPress={() => changePhotoIndex(1)}
            activeOpacity={0.6}
            style={[
              styles.photoButton,
              photoIndex >= photoIds?.length - 1 && styles.buttonDisabled,
            ]}>
            <Text style={styles.photoText}>{t('next')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedMarker.Name}</Text>
      <Text style={styles.lastUpdated}>
        {!!countryCode && getFormattedTime(controls?.TS, countryCode)}
      </Text>
      {controlsModes?.PhotoType && photoSliderComponent()}
      {controls?.ControlValues?.ArchModes && archModesComponent()}
      {controls?.ControlValues?.Slider && sliderComponent()}
      {controls?.ControlValues?.Coils && coilsComponent()}
      {controls?.ControlValues?.Inputs && inputsComponent()}
    </View>
  );
};

const archModesData = [
  {
    ItemId: '0',
    Name: 'Off',
  },
  {
    ItemId: '1',
    Name: 'Weekday1',
  },
  {
    ItemId: '2',
    Name: 'Weekday2',
  },
  {
    ItemId: '3',
    Name: 'Weekend',
  },
  {
    ItemId: '4',
    Name: 'Holiday',
  },
  {
    ItemId: '5',
    Name: 'Christmas',
  },
  {
    ItemId: '6',
    Name: 'Fade1',
  },
  {
    ItemId: '7',
    Name: 'Fade2',
  },
  {
    ItemId: '8',
    Name: 'OpenDoor',
  },
  {
    ItemId: '9',
    Name: 'CloseDoor',
  },
];

export default ControlPart;
