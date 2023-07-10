import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    height: 60,
    backgroundColor: Colors.white,
    marginTop: 30,
    borderWidth: 1,
    borderColor: Colors.main,
  },
  text: {
    fontFamily: Fonts.mainFontFamily,
    fontSize: 16,
    lineHeight: 18,
    color: Colors.main,
  },
});
