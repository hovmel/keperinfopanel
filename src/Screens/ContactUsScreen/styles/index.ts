import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputField: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 200,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: Colors.main,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.white,
    fontSize: 20,
  },
  safeAreaContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
});
