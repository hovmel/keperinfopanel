import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    flex: 1,
    paddingBottom: 210,
  },
  title: {
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 18,
  },
  lastUpdated: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.lightGray,
    fontSize: 12,
  },
  stateItem: {
    marginTop: 16,
  },
  stateItemTitle: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.lightGray,
    fontSize: 10,
  },
  stateItemText: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
  },
});
