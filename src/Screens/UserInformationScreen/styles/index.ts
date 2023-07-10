import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
  },
  dataText: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
    fontSize: 16,
    marginBottom: 10,
  },
  categoryText: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.main,
    fontSize: 14,
  },
  separatorLine: {
    marginVertical: 10,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
});
