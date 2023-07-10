import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 20,
    borderRadius: 30,

    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 1,
    shadowRadius: 10, // blur
  },
  text: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
  },
});
