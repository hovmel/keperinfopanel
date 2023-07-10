import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    height: 60,
    marginBottom: 10,
    alignItems: 'center',

    borderRadius: 6,

    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 1,
    shadowRadius: 10,
  },
  selectedItem: {
    borderWidth: 1,
    borderColor: Colors.shadowColor,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 18,
    fontFamily: Fonts.mainFontFamily,
  },
  arrow: {
    marginTop: 3,
    height: 14,
    width: 8,
  },
  iconContainer: {
    flex: 1,
    maxHeight: 50,
    maxWidth: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    resizeMode: 'center',
    flex: 1,
    maxWidth: 27,
    maxHeight: 18,
  },
});
