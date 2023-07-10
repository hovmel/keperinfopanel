import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {LineChart} from 'react-native-chart-kit';
import DataList from '../../Screens/StatesScreen/data';
import Colors from '../../Constants/Colors';
import moment from 'moment';
import useTranslation, {translate} from '../../Translations';
import _ from 'lodash';

const contentInset = 0;
const indexes = ['first', 'second', 'third'];

const GraphCard = ({dataList}) => {
  const [activeState, setActiveState] = useState<string>('first');
  const [activeItem, setActiveItem] = useState<any>(dataList[0]);
  const {t} = useTranslation();

  useEffect(() => {
    setActiveItem(dataList[indexes.findIndex(item => item === activeState)]);
  }, [activeState]);

  const averageOfArray = list => {
    return list.reduce((prev, curr) => prev + curr, 0) / list.length;
  };

  const compressData = list => {
    return list;
    const chunkedList = _.chunk(list, 10);
    const res = chunkedList.reduce((prev, curr) => {
      const average = averageOfArray(curr);
      let a = 0;
      curr.forEach(item => {
        if (Math.abs(item - average) > a) {
          a = item;
        }
      });
      return [...prev, average];
    }, []);

    return res;
  };

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
        const thisMin = Math.min(...item.data);
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

  const newData = {
    datasets: dataList?.map((item, index) => ({
      data: item.data,
      color: () => Colors.graph[index], // optional
      strokeWidth: 1, // optional
    })),
  };
  const chartConfig = {
    backgroundGradientToOpacity: 0,
    backgroundGradientFromOpacity: 0,
    color: () => Colors.lightGray,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
  };

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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            width: '100%',
            height: 110,
          }}>
          <LineChart
            data={newData}
            bezier
            formatYLabel={val => {
              if (!Number.isFinite(step) || biggestValue - smallestValue < 5) {
                if (biggestValue - smallestValue < 2) {
                  return Number(val).toFixed(2).toString();
                } else {
                  return Number(val).toFixed(1).toString();
                }
              }
              //console.log(val, ((+val / step).toFixed(0) * step).toString());
              return ((+val / step).toFixed(0) * step).toString();
            }}
            width={
              Dimensions.get('window').width *
              Math.max(Math.ceil(dataList?.[0]?.data?.length / 1000), 1)
            }
            height={100}
            chartConfig={chartConfig}
            withVerticalLines={false}
            //withInnerLines={false}
            withDots={false}
            withShadow={false}
            propsForBackgroundLines={{color: 'red'}}
          />
        </ScrollView>

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
