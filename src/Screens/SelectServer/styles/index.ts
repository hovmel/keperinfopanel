import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    backgroundColor: Colors.white,
    flex: 1,
  },
  header: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  openButton: {
    paddingVertical: 10,
    backgroundColor: Colors.ultraLightGray2,
    marginBottom: 20,
  },
  openText: {
    textAlign: 'center',
    fontFamily: Fonts.mediumFontFamily,
  },
  addButton: {
    height: undefined,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  addText: {
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 16,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  nameBlock: {},
  link: {
    fontFamily: Fonts.mainFontFamily,
    fontSize: 14,
    width: '70%',
  },
  logIn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: Colors.main,
    borderRadius: 4,
  },
  logInText: {
    fontFamily: Fonts.boldFontFamily,
    fontSize: 12,
    color: '#fff',
  },
  modal: {
    alignItems: 'center',
  },
  modalWrapper: {
    width: '95%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  qrWrapper: {
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    marginBottom: -20,
  },
  addInput: {
    color: Colors.gray,
    fontSize: 14,
    height: 30,
    minWidth: 180,
    maxWidth: '90%',
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  serverRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  dropdown: {
    width: 90,
    height: 24,
    backgroundColor: '#eeeeee',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
  },
  serverDefaultText: {
    color: Colors.black,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 5,
  },

  edit: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: Colors.main,
    borderRadius: 4,
    marginRight: 4,
  },
  editImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
