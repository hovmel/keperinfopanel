import Colors from '../../../Constants/Colors';
import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  header: {
    fontFamily: Fonts.boldFontFamily,
    fontSize: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterContainer: {
    backgroundColor: Colors.white,
    opacity: 0.85,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 80,
    paddingBottom: 95,
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: Fonts.mainFontFamily,
    marginRight: 15,
    color: Colors.lightGray,
  },
  icon: {
    height: 40,
    width: 30,
    resizeMode: 'contain',
    marginRight: 5,
  },
  closeContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  closeImg: {
    width: 20,
    height: 20,
  },
});
