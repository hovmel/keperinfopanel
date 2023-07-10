import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    left: 22,
    right: 22,
    borderRadius: 30,
    height: 60,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingBottom: 3,
    paddingTop: 10,

    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 1,
    shadowRadius: 10, // blur
  },
  icon: {
    width: 18,
    height: 20,
    marginBottom: 4,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 9,
    fontFamily: Fonts.mainFontFamily,
  },
});

export default styles;
