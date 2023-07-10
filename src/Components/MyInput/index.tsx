import React, {FC, useState} from 'react';
import {View, Text, TextInputProps, TextInput, StyleProp} from 'react-native';
import styles from './styles';
import Colors from '../../Constants/Colors';

interface Props extends TextInputProps {
  error?: string;
  wrapperStyle?: string;
}

const MyInput: FC<Props> = ({error, style, wrapperStyle, ...p}) => {
  const [isActive, setActive] = useState(false);
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <TextInput
        placeholderTextColor={Colors.lightGray}
        style={[
          styles.input,
          isActive && styles.activeInput,
          !!error && styles.errorInput,
          style,
        ]}
        {...p}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default MyInput;
