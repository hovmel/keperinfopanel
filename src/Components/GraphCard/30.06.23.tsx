import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {LineChart, Grid} from 'react-native-svg-charts';
import DataList from '../../Screens/StatesScreen/data';
import Colors from '../../Constants/Colors';
import moment from 'moment';
import useTranslation, {translate} from '../../Translations';

const contentInset = 0;
const indexes = ['first', 'second', 'third'];

const GraphCard = ({dataList, setLoading}) => {
  const [activeState, setActiveState] = useState<string>('first');
  const [activeItem, setActiveItem] = useState<any>(dataList[0]);
  const {t} = useTranslation();

  useEffect(() => {
    setActiveItem(dataList[indexes.findIndex(item => item === activeState)]);
  }, [activeState]);

  const biggestValue = useMemo(() => {
    if (dataList?.length) {
      let val = dataList[0].data[0];
      dataList?.map((item, index) => {
        const thisMax = Math.max(...item.data);
        if (thisMax > val) {
          val = thisMax;
        }
      });
      return val;
    }
  }, [dataList]);

  const smallestValue = useMemo(() => {
    if (dataList?.length) {
      let val = dataList[0].data[0];
      dataList?.map((item, index) => {
        const thisMin = Math.max(...item.data);
        if (thisMin < val) {
          val = thisMin;
        }
      });

      return val;
    }
  }, [dataList]);

  const step = useMemo(() => {
    if (Number.isFinite(smallestValue) && Number.isFinite(biggestValue)) {
      const someBigNumber = 1;
      const difference = (biggestValue - smallestValue) * someBigNumber;
      if (difference > 1) {
        let countOfTen = String(Math.round(difference)).length - 1;
        if (+String(difference)[0] < 4) {
          countOfTen -= 1;
        }
        //console.log({difference, step: Math.pow(10, countOfTen), countOfTen});
        return Math.pow(10, countOfTen);
      }
      return 1;
    }
  }, [smallestValue, biggestValue]);

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.graphInner}>
        <View style={styles.row}>
          {dataList.length && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveState('first')}>
              <View
                style={[
                  styles.circle,
                  {backgroundColor: Colors.graphFirstColor},
                ]}
              />
              <View style={styles.buttonBlock}>
                <Text style={styles.buttonInfo}>
                  {dataList[0].name}{' '}
                  {dataList[0].measureType &&
                    dataList[0].name[dataList[0].name.length - 1] !== ')' &&
                    '(' + dataList[0].measureType + ')'}
                </Text>
                <Text
                  style={[styles.buttonAvg, {color: Colors.graphFirstColor}]}>
                  {t('Avg')}: {dataList[0].average.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {dataList.length > 1 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveState('second')}>
              <View
                style={[
                  styles.circle,
                  {backgroundColor: Colors.graphSecondColor},
                ]}
              />
              <View style={styles.buttonBlock}>
                <Text style={styles.buttonInfo}>
                  {dataList[1].name}{' '}
                  {dataList[1].measureType &&
                    dataList[1].name[dataList[1].name.length - 1] !== ')' &&
                    '(' + dataList[1].measureType + ')'}
                </Text>
                <Text
                  style={[styles.buttonAvg, {color: Colors.graphSecondColor}]}>
                  {t('Avg')}: {dataList[1].average.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {dataList.length > 2 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveState('third')}>
              <View
                style={[
                  styles.circle,
                  {backgroundColor: Colors.graphThirdColor},
                ]}
              />
              <View style={styles.buttonBlock}>
                <Text style={styles.buttonInfo}>
                  {dataList[2].name}{' '}
                  {dataList[2].measureType &&
                    dataList[2].name[dataList[2].name.length - 1] !== ')' &&
                    '(' + dataList[2].measureType + ')'}
                </Text>
                <Text
                  style={[styles.buttonAvg, {color: Colors.graphThirdColor}]}>
                  {t('Avg')}: {dataList[2].average.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.graphWrapper}>
          {dataList.map((item, index) => {
            const max = Math.ceil(Math.max(...item.data));
            const min = Math.floor(Math.min(...item.data));
            const texts = [max, Math.round((max + min) / 2), min].map(val => {
              if (!Number.isFinite(step) || biggestValue - smallestValue < 5) {
                return val;
              }
              //console.log(val, ((+val / step).toFixed(0) * step).toString());
              return (+val / step).toFixed(0) * step;
            });
            return (
              <>
                <LineChart
                  style={[
                    styles.graphItem,
                    index === indexes.findIndex(item => item === activeState)
                      ? {zIndex: 1}
                      : {zIndex: 0},
                  ]}
                  data={item.data}
                  svg={{
                    stroke:
                      index === 0
                        ? Colors.graphFirstColor
                        : index === 1
                        ? Colors.graphSecondColor
                        : index === 2
                        ? Colors.graphThirdColor
                        : '#000',
                    strokeWidth: 2,
                  }}
                  contentInset={{
                    top: contentInset,
                    bottom: contentInset,
                  }}
                />
                {(true || item.UseOwnAxis !== false) && (
                  <View
                    style={[
                      styles.yAxis,
                      index === 0
                        ? styles.yAxisFirst
                        : index === 1
                        ? styles.yAxisSecond
                        : index === 2
                        ? styles.yAxisThird
                        : null,
                    ]}>
                    <View
                      style={[
                        styles.yAxisInner,
                        index === 0
                          ? styles.yAxisInnerFirst
                          : index === 1
                          ? styles.yAxisInnerSecond
                          : index === 2
                          ? styles.yAxisInnerThird
                          : null,
                      ]}>
                      {texts.map(item => (
                        <Text
                          key={item + Math.random() + index}
                          style={[
                            styles.yAxisText,
                            {fontSize: Math.min(10, 36 / String(item).length)},
                            index === 0
                              ? styles.yAxisTextFirst
                              : index === 1
                              ? styles.yAxisTextSecond
                              : index === 2
                              ? styles.yAxisTextThird
                              : null,
                          ]}>
                          {item}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
              </>
            );
          })}
          <View style={styles.bottomLine} />
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.bottomBlock}>
            <Text
              style={[
                styles.bottomTitle,
                {
                  color:
                    activeState === 'first'
                      ? Colors.graphFirstColor
                      : activeState === 'second'
                      ? Colors.graphSecondColor
                      : Colors.graphThirdColor,
                },
              ]}>
              {t('Min')}: {activeItem.data[activeItem.minIndex]}
            </Text>
            <Text style={styles.bottomInfo}>
              {moment(activeItem.timeStamps[activeItem.minIndex]).format(
                'DD/MM/YYYY',
              )}
            </Text>
            <Text style={styles.bottomInfo}>
              {moment(activeItem.timeStamps[activeItem.minIndex]).format(
                'HH:mm:ss',
              )}
            </Text>
          </View>
          <View style={styles.bottomBlock}>
            <Text
              style={[
                styles.bottomTitle,
                {
                  color:
                    activeState === 'first'
                      ? Colors.graphFirstColor
                      : activeState === 'second'
                      ? Colors.graphSecondColor
                      : Colors.graphThirdColor,
                },
              ]}>
              {t('Max')}: {activeItem.data[activeItem.maxIndex]}
            </Text>
            <Text style={styles.bottomInfo}>
              {moment(activeItem.timeStamps[activeItem.maxIndex]).format(
                'DD/MM/YYYY',
              )}
            </Text>
            <Text style={styles.bottomInfo}>
              {moment(activeItem.timeStamps[activeItem.maxIndex]).format(
                'HH:mm:ss',
              )}
            </Text>
          </View>
          <View style={styles.bottomBlock}>
            <Text
              style={[
                styles.bottomTitle,
                {
                  color:
                    activeState === 'first'
                      ? Colors.graphFirstColor
                      : activeState === 'second'
                      ? Colors.graphSecondColor
                      : Colors.graphThirdColor,
                },
              ]}>
              {t('FirstValue')}: {activeItem.data[activeItem.firstIndex]}
            </Text>
            <Text style={styles.bottomInfo}>
              {moment(activeItem.timeStamps[activeItem.firstIndex]).format(
                'DD/MM/YYYY',
              )}
            </Text>
            <Text style={styles.bottomInfo}>
              {moment(activeItem.timeStamps[activeItem.firstIndex]).format(
                'HH:mm:ss',
              )}
            </Text>
          </View>
          <View style={styles.bottomBlock}>
            <Text
              style={[
                styles.bottomTitle,
                {
                  color:
                    activeState === 'first'
                      ? Colors.graphFirstColor
                      : activeState === 'second'
                      ? Colors.graphSecondColor
                      : Colors.graphThirdColor,
                },
              ]}>
              {t('EndValue')}: {activeItem.data[activeItem.lastIndex]}
            </Text>
            <Text style={styles.bottomInfo}>
              {moment(activeItem.timeStamps[activeItem.lastIndex]).format(
                'DD/MM/YYYY',
              )}
            </Text>
            <Text style={styles.bottomInfo}>
              {moment(activeItem.timeStamps[activeItem.lastIndex]).format(
                'HH:mm:ss',
              )}
            </Text>
          </View>
          <View style={styles.bottomBlock}>
            <Text
              style={[
                styles.bottomTitle,
                {
                  color:
                    activeState === 'first'
                      ? Colors.graphFirstColor
                      : activeState === 'second'
                      ? Colors.graphSecondColor
                      : Colors.graphThirdColor,
                },
              ]}>
              {t('Diff')}:{' '}
              {Math.abs(
                activeItem.data[activeItem.lastIndex] -
                  activeItem.data[activeItem.firstIndex],
              ).toFixed(1)}
            </Text>
            <Text style={styles.bottomInfo}>----</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GraphCard;
