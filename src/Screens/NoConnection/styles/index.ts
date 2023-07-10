import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainText: {
    color: Colors.gray,
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 100,
  },
  restartText: {
    color: Colors.gray,
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 14,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
  },
});
