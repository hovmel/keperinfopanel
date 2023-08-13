import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ArrowNavigationHeader} from '../../Components/Header/ArrowNavigationHeader';
import {styles} from './styles';
import {SafeAreaView} from "react-native-safe-area-context";

const TextInformationScreen = ({route, header, text}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerStyle}>
        <ArrowNavigationHeader header={header} />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text>{text}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TextInformationScreen;
