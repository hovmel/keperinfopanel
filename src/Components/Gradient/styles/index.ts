import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';
import {translate} from '../../../Translations';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  ceil: {
    borderWidth: 1,
    borderColor: Colors.ultraLightGray,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  labelText: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
  },
  reverseText: {
    transform: [{rotate: '90deg'}, {translateY: 20}],
    height: 60,
  },
});
