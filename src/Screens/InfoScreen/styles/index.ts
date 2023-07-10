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
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.ultraLightGray,
    paddingBottom: 40,
    marginBottom: 14,
  },
  logo: {
    width: '80%',
    resizeMode: 'contain',
    height: 100,
  },
  version: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.lightGray,
    fontSize: 14,
  },
  button: {
    paddingVertical: 14,
  },
  buttonText: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.gray,
    fontSize: 14,
  },
});
