import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const InputContainer = ({
  header,
  textInput = null,
  isPassword = false,
  isNumeric = false,
  onPasswordChanged = null,
  placeholder = '',
  style = {},
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  return (
    <View style={style}>
      <Text style={styles.fieldHeader}>{header}</Text>
      {isPassword ? (
        <View style={styles.inputSection}>
          <TextInput
            style={styles.field}
            placeholder={placeholder}
            secureTextEntry={passwordVisibility}
            keyboardType={isNumeric ? 'numeric' : 'default'}
            onChangeText={text => onPasswordChanged(text)}
          />
          <TouchableOpacity
            style={styles.touchableEye}
            onPress={() => setPasswordVisibility(!passwordVisibility)}>
            <Image
              source={require('../../../assets/icons/open_eye.png')}
              style={styles.eye}
            />
          </TouchableOpacity>
          <Image
            source={require('../../../assets/icons/arrow.png')}
            style={styles.icon}
          />
        </View>
      ) : (
        <View style={styles.inputSection}>
          {textInput}
          <Image
            source={require('../../../assets/icons/arrow.png')}
            style={styles.icon}
          />
        </View>
      )}
    </View>
  );
};
