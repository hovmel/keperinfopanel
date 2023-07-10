import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
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
    width: '100%',
    height: 195,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    borderWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 120,
    paddingHorizontal: 22,
  },
  buttonItem: {
    marginTop: 20,
    backgroundColor: Colors.main,
    borderRadius: 10,
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: '100%',
    height: 60,
    justifyContent: 'center',
  },
  buttonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
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
  infoBlock: {
    width: '85%',
  },
  objectName: {
    color: '#313131',
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 14,
    width: '100%',
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
