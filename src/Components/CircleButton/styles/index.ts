import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 2,
    shadowRadius: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 20,
    height: 20,

  },
});
