import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingBottom: 10,
    paddingRight: 17,

    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 1,
    shadowRadius: 10,
  },
  listItem: {
    marginHorizontal: 16,
  },
  listItemTextContainer: {
    paddingVertical: 7,
    flex: 1,
  },
  listItemText: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
  },
});
