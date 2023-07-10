import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingBottom: 210,
  },
  buttonsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.ultraLightGray,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    width: '50%',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
    fontSize: 14,
    marginLeft: 8,
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
  border: {
    borderRightWidth: 1,
    borderColor: Colors.ultraLightGray,
  },

  modalWrapper: {
    maxHeight: 200,
    minWidth: '90%',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  checkbox: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCheckbox: {
    backgroundColor: Colors.main,
  },
  checkboxInner: {
    width: 12,
    height: 12,
  },
  modalText: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.gray,
    fontSize: 14,
    marginLeft: 14,
  },
  columnList: {},

  columnItem: {},
  columnTitle: {
    fontSize: 14,
  },
  columnText: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.gray,
    fontSize: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: Colors.ultraLightGray,
    paddingVertical: 8,
  },

  arrow: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    opacity: 0.5,
    marginLeft: 6,
    transform: [{rotate: '-90deg'}],
  },
  upArrow: {
    transform: [{rotate: '90deg'}],
  },
});
