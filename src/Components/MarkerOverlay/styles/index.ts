import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  mainContainer: {
  },
  header: {
    fontFamily: Fonts.boldFontFamily,
    fontSize: 20,
    marginBottom: 10,
  },
  closeContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  closeImg: {
    width: 20,
    height: 20,
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    minHeight: 50,
  },
  button: {
    color: Colors.white,
  },
  closeText: {
    color: Colors.main,
    fontFamily: Fonts.boldFontFamily,
    alignSelf: 'center',
    fontSize: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.main,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  scrollView: {

  },
  loadingText: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
    fontSize: 14,
  },
});
