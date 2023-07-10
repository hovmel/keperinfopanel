import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 22,
    justifyContent: 'space-between',
  },

  boardsDropdown: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 18,
    width: '100%',
  },
  nonActive: {
    justifyContent: 'flex-start',
  },
  backButton: {
    paddingVertical: 20,
    paddingRight: 20,
  },
  backArrow: {
    width: 20,
    height: 18,
    resizeMode: 'contain',
  },
  boardsDropdownText: {
    color: '#313131',
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 14,
  },
  dropDownArrow: {
    width: 14,
    resizeMode: 'contain',
  },
  boardsPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '85%',
  },
  boardsControl: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  menu: {
    width: 32,
    height: 22,
    opacity: 0.5,
  },

  wrapper: {
    paddingHorizontal: 22,
  },
  contentWrapper: {
    paddingHorizontal: 22,
    marginTop: 14,
    marginBottom: 140,
  },
  loadingView: {
    alignSelf: 'center',
    marginTop: 30,
  },
  buttons: {
    borderWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 120,
    paddingHorizontal: 22,
  },

  buttonHeader: {
    color: '#575756',
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 16,
  },
  buttonInfo: {
    color: '#575756',
    fontFamily: Fonts.mainFontFamily,
    fontSize: 14,
  },
  barStyle: {
    width: 40,
    backgroundColor: '#868686',
    height: 4,
    borderRadius: 10,
  },
  buttonWrapper: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starView: {
    marginRight: 20,
    marginLeft: 4,
  },
  star: {
    width: 15,
    height: 15,
  },
  infoBlock: {},
  objectName: {
    color: '#313131',
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 14,
  },
  objectType: {
    color: Colors.gray,
    fontFamily: Fonts.mainFontFamily,
    fontSize: 12,
  },
  objectState: {
    color: '#313131',
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 12,
  },
  conditionBlock: {
    justifyContent: 'space-between',
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onOff: {
    color: '#313131',
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 14,
    marginRight: 5,
  },
  circle: {
    width: 7,
    height: 7,
    backgroundColor: '#313131',
    borderRadius: 7,
  },
  percentage: {
    alignSelf: 'flex-end',
    color: '#313131',
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 14,
  },
  datePicker: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateFilters: {
    position: 'absolute',
    bottom: 110,
    backgroundColor: 'white',
    left: 0,
    width: '100%',
    zIndex: 20,
  },
  /*versionText: {
    color: Colors.lightGray,
    marginTop: -34,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView: {
    height: 100,
    width: 200,
  },
  accountButton: {
    position: 'absolute',
    top: 20,
    right: 16,
    zIndex: 999,
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  accountView: {
    width: 48,
    height: 48,
    borderRadius: 30,
    padding: 8,
    marginTop: 20,
    borderColor: '#d2d2d2',
    borderWidth: 2,
  },
  account: {
    width: '100%',
    height: '100%',
  },
  main: {},
  buttonItem: {
    marginTop: 20,
    backgroundColor: Colors.main,
    borderRadius: 10,
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#ececec',
    borderRadius: 10,
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  buttonHeader: {
    color: '#575756',
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 22,
    marginBottom: 6
  },
  buttonInfo: {
    color: '#575756',
    fontFamily: Fonts.mainFontFamily,
    fontSize: 14,
  }*/
});
