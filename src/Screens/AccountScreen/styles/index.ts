import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 22,
  },
  inner: {
    paddingHorizontal: 28,
    marginBottom: 30,
  },
  avatarBlock: {
    marginTop: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 11,
    borderRadius: 10,
    flexDirection: 'row',
  },
  favoritesButton: {
    backgroundColor: '#FAD849',
    alignSelf: 'center',
    paddingHorizontal: 25,
  },
  star: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  buttonText: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.white,
    fontSize: 12,
  },
  nameInputsBlock: {
    marginVertical: 20,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderColor: Colors.lightGray,
    marginBottom: 10,
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 15,
    color: Colors.gray,
  },
  label: {
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 12,
    color: Colors.lightGray,
    marginBottom: -4,
  },
  professionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  professionsButton: {
    backgroundColor: Colors.main,
    marginHorizontal: 4,
    marginBottom: 8,
    alignItems: 'center',
  },
  cross: {
    width: 8,
    height: 8,
    marginLeft: 10,
  },
  line: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginTop: 10,
    width: '100%',
  },
  changePassword: {
    marginVertical: 14,
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.gray,
  },
  passwordBlock: {},
  fieldPassword: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderColor: Colors.lightGray,
    marginBottom: 10,
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.gray,
    paddingRight: 50,
  },
  eye: {
    height: 15,
    width: 30,
    resizeMode: 'center',
  },
  touchableEye: {
    height: 20,
    width: 30,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bottomButton: {
    borderWidth: 1,
    borderColor: Colors.main,
    backgroundColor: Colors.main,
    paddingHorizontal: 30,
  },
  cancel: {
    borderWidth: 1,
    borderColor: Colors.main,
    backgroundColor: '#f3f3f3',
  },
  buttonTextCancel: {
    color: Colors.main,
  },
  disabled: {
    opacity: 0.5,
  },

  arrowView: {
    position: 'absolute',
    right: 20,
    top: 16,
  },
  arrow: {
    width: 14,
    resizeMode: 'contain',
  },
  languageItem: {
    minWidth: 300,
    paddingVertical: 10,
  },
  languageItemText: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.gray,
    fontSize: 14,
  },
  activeLanguage: {
    color: Colors.main,
  },
});
