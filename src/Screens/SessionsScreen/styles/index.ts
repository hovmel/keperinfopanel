import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    backgroundColor: Colors.white,
    flex: 1,
  },
  safeAreaContainer: {
    height: 800,
  },
  scrollViewContainer: {
    paddingBottom: 80,
  },
  picker: {
    marginTop: -30,
  },
  loadingText: {
    alignSelf: 'center',
    color: Colors.lightGray,
    fontFamily: Fonts.mainFontFamily,
    marginTop: 50,
  },
  totalContainer: {
    height: 235,
    borderRadius: 20,
    backgroundColor: Colors.white,
    elevation: 2,
    marginBottom: 25,
    alignItems: 'center',
  },
  totalImage: {
    marginVertical: 20,
    height: 80,
    resizeMode: 'contain',
  },
  totalHeader: {
    fontFamily: Fonts.boldFontFamily,
    fontSize: 12,
    color: Colors.lightGray,
  },
  totalText: {
    fontFamily: Fonts.boldFontFamily,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: Colors.main,
  },
});
