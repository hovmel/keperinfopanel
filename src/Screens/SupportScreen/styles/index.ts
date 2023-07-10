import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    backgroundColor: Colors.white,
    flex: 1,
  },
  title: {
    fontFamily: Fonts.boldFontFamily,
    color: Colors.gray,
    fontSize: 14,
    marginBottom: 18,
  },
  input: {
    marginBottom: 10,
  },
  multiline: {
    height: 150,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: Colors.main,
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
  disabled: {
    backgroundColor: Colors.gray,
  },
  buttonText: {
    flex: 1,
    fontFamily: Fonts.mediumFontFamily,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: Colors.white,
  },
});
