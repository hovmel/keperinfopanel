import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: Colors.white,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 6,

    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 1,
    shadowRadius: 10,
  },
  orderVerticalContainer: {
    marginRight: 20,
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 3,
  },
  verticalContainer: {
    marginLeft: 10,
  },
  orderNumber: {
    fontSize: 14,
    marginRight: 5,
    fontFamily: Fonts.mainFontFamily,
  },
  orderDate: {
    fontSize: 12,
    fontFamily: Fonts.mainFontFamily,
    color: Colors.lightGray,
    marginRight: 5,
  },
  orderStatus: {
    fontSize: 13,
    marginRight: 3,
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
  },
  usedText: {
    color: Colors.main,
    fontFamily: Fonts.mainFontFamily,
  },
  delimiterSpace: {
    marginRight: 10,
  },
  darkText: {
    color: Colors.black,
    fontFamily: Fonts.mainFontFamily,
  },
});
