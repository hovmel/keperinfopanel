import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  symbolsLeft: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.lightGray,
    fontSize: 15,
    position: 'absolute',
    bottom: 15,
    right: 10,
  },
});
