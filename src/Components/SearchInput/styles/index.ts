import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 60,
  },
  searchInput: {
    flex: 1,
    color: Colors.gray,
    maxHeight: 45,
    padding: 0,
    fontFamily: Fonts.mainFontFamily,
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 18,
  },
  inputSection: {
    flex: 1,
    borderRadius: 50,
    maxHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderColor: Colors.lightGray,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,

    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 2,
    shadowRadius: 10, // blur
  },
  icon: {
    alignSelf: 'center',
    paddingVertical: 7,
    height: 14,
    width: 14,
    resizeMode: 'center',
  },
});
