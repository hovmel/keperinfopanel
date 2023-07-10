import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {},
  text: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
  },
  header: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  wrapper: {
    paddingHorizontal: 22,
  },
  loadingView: {
    alignSelf: 'center',
    marginTop: 30,
  },
  accordionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starView: {
    marginRight: 10,
  },
  star: {
    width: 15,
    height: 15,
  },
  titleBlock: {},
  title: {
    fontFamily: Fonts.mediumFontFamily,
    color: '#262626',
  },
  description: {
    fontSize: 10,
    color: Colors.gray,
    fontFamily: Fonts.mainFontFamily,
  },
  micButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    borderWidth: 1,
    padding: 5,
    backgroundColor: Colors.white,
    borderColor: '#d5d5d5',
  },
  mic: {
    width: 30,
    height: 30,
    opacity: 0.7,
  },
  inputView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    width: '65%',
    height: 30,
    justifyContent: 'space-between',

    position: 'absolute',
    top: 12,
    left: '17%',
    zIndex: 100,
  },
  input: {
    marginHorizontal: 10,
    color: '#8c8c8c',
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 12,
    width: '68%',
    height: 36,
  },
  star: {
    width: 20,
    height: 18,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  search: {
    width: 20,
    height: 28,
    resizeMode: 'contain',
    opacity: 0.5,
  },
});
