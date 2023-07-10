import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.main,
  },
  helperText: {
    color: Colors.white,
    fontFamily: Fonts.mainFontFamily,
    alignSelf: 'center',
  },
  logo: {
    maxWidth: 230,
    maxHeight: 230,
    flex: 1,
    alignSelf: 'center',
  },
  delImage: {
    maxWidth: 40,
    maxHeight: 40,
  },
});
