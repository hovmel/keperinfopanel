import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    flex: 1,
    paddingBottom: 210,
  },
  title: {
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 18,
  },
  lastUpdated: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.lightGray,
    fontSize: 12,
  },
  controlItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  itemTitle: {
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 20,
  },
  jackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  jackText: {
    fontFamily: Fonts.mainFontFamily,
    fontSize: 14,
    color: Colors.gray,
  },
  telemetryItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  telemetryText: {
    fontFamily: Fonts.boldFontFamily,
    fontSize: 14,
    color: Colors.gray,
    width: 60,
  },
  telemetryIcon: {
    width: 8,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#ececec',
  },
  buttonText: {
    fontSize: 30,
    fontFamily: Fonts.boldFontFamily,
    color: Colors.main,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonTextDisabled: {
    color: Colors.lightGray,
  },
  archModesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  archModesButton: {
    width: '26%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444444',
    paddingVertical: 6,
    marginHorizontal: 6,
    marginBottom: 6,
    alignItems: 'center',
  },
  archModesActive: {
    borderColor: Colors.main,
  },
  archModesText: {
    fontSize: 14,
    color: '#1c1c1c',
    fontFamily: Fonts.mainFontFamily,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoButton: {
    width: '40%',
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: Colors.gray,
    borderWidth: 1,
  },
  photoText: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.gray,
    fontSize: 14,
  },
  photoView: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
