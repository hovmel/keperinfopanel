import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  fieldHeader: {
    color: Colors.lightGray,
    fontFamily: Fonts.mainFontFamily,
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
  },
  field: {
    flex: 1,
    marginTop: 20,
    color: Colors.gray,
    height: 120,

    fontFamily: Fonts.mainFontFamily,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
  },
  inputSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
    borderBottomWidth: 0.4,
    borderColor: Colors.lightGray,
    marginBottom: 20,
    maxHeight: 30,
  },
  icon: {
    marginTop: 20,
    paddingVertical: 7,
    height: 2,
    width: 14,
    resizeMode: 'center',
  },
  eye: {
    height: 15,
    width: 30,
    resizeMode: 'center',
  },
  touchableEye: {
    marginRight: 3,
    paddingVertical: 30,
    height: 20,
    width: 30,
  },
});
