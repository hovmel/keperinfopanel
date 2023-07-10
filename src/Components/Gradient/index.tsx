import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './styles';

const ceilWidth = 50;
const nameWidth = 100;

const Gradient = ({data}) => {
  return (
    <View style={[styles.wrapper]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {data?.Headers?.map(({HeaderValues}, index1) => (
            <View key={index1} style={[styles.row, styles.headersRow]}>
              <View style={[styles.ceil, {width: nameWidth}]} />
              {HeaderValues?.map((item, index2) => (
                <View
                  key={item.Name + index2}
                  style={[styles.ceil, {width: item.ClmnSpan * ceilWidth}]}>
                  <Text
                    style={[
                      styles.labelText,
                      index1 === 1 && styles.reverseText,
                    ]}>
                    {item.Name}
                  </Text>
                </View>
              ))}
            </View>
          ))}
          {data?.RowValues?.map((item, index1) => (
            <View key={index1} style={[styles.row]}>
              <View style={[styles.ceil, {width: nameWidth}]}>
                <Text style={[styles.labelText]}>{item.RowName}</Text>
              </View>
              {item?.CellValues?.map((item2, index2) => (
                <View
                  key={item2.Value + 'key' + index2}
                  style={[styles.ceil, {width: ceilWidth}]}>
                  <Text
                    style={[
                      styles.labelText,
                      {
                        color:
                          item2.Color === 'White'
                            ? 'white'
                            : `rgb(${item2.Color})`,
                      },
                    ]}>
                    {item2.Value}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Gradient;
