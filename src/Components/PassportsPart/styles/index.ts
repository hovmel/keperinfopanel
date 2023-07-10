import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    flex: 1,
    paddingBottom: 160,
  },
  title: {
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 18,
  },
  passportItem: {
    marginTop: 16,
  },
  smallItem: {
    marginTop: 10,
  },
  lastUpdated: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.lightGray,
    fontSize: 12,
  },
  passportBlockTitle: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.lightGray,
    fontSize: 12,
  },
  passportItemTitle: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.lightGray,
    fontSize: 10,
  },
  passportItemText: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
    fontSize: 16,
  },
  imageRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  image: {
    height: 70,
    width: 70,
  },
  imageView: {
    marginRight: 20,
  },
  modal: {
    flex: 1,
  },
  wrapper: {
    alignSelf: 'center',
    width: '90%',
    height: 400,
    backgroundColor: 'rgba(0,0,0,0.52)',
    alignItems: 'center',
    alignContent: 'center',
  },
  bigImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  close: {
    position: 'absolute',
    right: 0,
    top: -40,
    zIndex: 100,
  },
  closeImage: {
    width: 30,
    height: 30,
  },
  bigImageLoading: {
    fontFamily: Fonts.boldFontFamily,
    color: '#fff',
    fontSize: 20,
    marginTop: 196,
  },
});
