import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from './styles';

export const MultilineTextInput = props => {
  return (
    <View>
      <TextInput
        {...props}
        multiline={true}
        onChangeText={text => {
          if (props.onChangeText) {
            props.onChangeText(text);
          }
        }}
      />
      <Text style={styles.symbolsLeft}>
        {props.value.length}/{props.maxLength ? props.maxLength : 700}
      </Text>
    </View>
  );
};
