import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  sendCodeText: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.main,
    marginBottom: 40,
  },
});
