import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 30,
    paddingBottom: 100,
  },
  text: {
    fontFamily: Fonts.mainFontFamily,
    fontWeight: '400',
    color: Colors.gray,
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
  },
  headerStyle: {
    paddingHorizontal: 15,
    marginBottom: -20,
  },
  safeArea: {paddingBottom: 149},
});
