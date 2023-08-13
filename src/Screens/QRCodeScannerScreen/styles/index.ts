import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: Colors.main,
  },
  buttonText: {
    fontSize: 21,
    marginTop: 70,
    color: Colors.main,
  },
  backButton: {
    padding: 10,
  },
  accountButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 999,
  },
  successContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 100,
    elevation: 100,
    backgroundColor: 'rgba(92,92,92,0.53)',
  },
  waitingContainer: {
    position: 'absolute',
    top: 250,
    left: -100,
    right: -100,
    bottom: -350,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});
