import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from "../../../Constants/Fonts";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    flex: 1
  },
  versionText: {
    color: Colors.lightGray,
    marginTop: -34,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  accountButton: {
    width: 30,
    height: 30,
    borderWidth: 0,

    elevation: 0,
    shadowRadius: 0,
  },
  menuButton: {
    opacity: 0.7,

    shadowColor: Colors.white,
    shadowOpacity: 0,
    elevation: 0,
    shadowRadius: 0,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
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
    /*backgroundColor: Colors.main,*/
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
  },
  accountImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  }
});
