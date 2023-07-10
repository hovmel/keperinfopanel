import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  header: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.gray,
  },
  text: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.lightGray,
  },
  countdown: {
    fontFamily: Fonts.boldFontFamily,
    color: Colors.gray,
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
});
