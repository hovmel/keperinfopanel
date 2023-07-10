import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    backgroundColor: Colors.white,
    flex: 1,
  },
  text: {
    fontFamily: Fonts.boldFontFamily,
    color: Colors.gray,
    fontSize: 14,
    marginBottom: 30,
  },
});
