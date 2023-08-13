import React, {FC} from 'react';
import {Text, ScrollView} from 'react-native';
import styles from './styles';
import {ArrowNavigationHeader} from '../../Components/Header/ArrowNavigationHeader';
import {SafeAreaView} from "react-native-safe-area-context";

interface Props {
  route: any;
}

const TextScreen: FC<Props> = ({route}) => {
  const {text, header} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ArrowNavigationHeader header={header} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TextScreen;
