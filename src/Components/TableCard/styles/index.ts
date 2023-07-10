import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {},
  column: {
    borderRightWidth: 1,
    borderColor: Colors.lightGray,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  header: {},
  headerText: {
    color: '#777777',
    fontSize: 10,
    fontFamily: Fonts.mediumFontFamily,
  },
  itemText: {
    fontSize: 10,
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.black,
  },
  noBorder: {
    borderColor: '#f3f3f3',
  },
  hideBorder: {
    position: 'absolute',
    height: 36,
    width: 3,
    backgroundColor: '#f3f3f3',
    right: -2,
  },

  edit: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.ultraLightGray,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  editIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  modalWrapper: {
    maxHeight: 200,
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
  filterArrow: {
    position: 'absolute',
    right: 4,
    top: 12,
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
});
