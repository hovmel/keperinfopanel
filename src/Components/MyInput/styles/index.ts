import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';

export default StyleSheet.create({
  wrapper: {},
  input: {
    paddingHorizontal: 14,
    width: '100%',
    fontSize: 14,

    borderWidth: 1,
    borderColor: Colors.ultraLightGray,
    borderRadius: 10,
    textAlignVertical: 'top',
    paddingTop: 10,
    height: 40,
  },
  activeInput: {
    borderColor: Colors.main,
  },
  errorInput: {
    borderColor: Colors.error,
  },
  error: {
    fontSize: 12,
    color: Colors.error,
  },
});
