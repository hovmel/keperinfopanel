import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

class AccordionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded || false,
    };
  }

  setExpanded = val => this.setState({expanded: val});

  render() {
    const {
      children,
      titleComponent,
      onPress,
      onArrowPress,
      arrowComponent,
      wrapperStyle,
      headerStyle,
      arrowStyle,
      childrenStyle,
      otherPressFunction,
    } = this.props;
    const {expanded} = this.state;

    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <TouchableOpacity
          style={[styles.header, styles.headerBorder, headerStyle]}
          onPress={
            otherPressFunction && typeof onPress === 'function'
              ? onPress
              : () => this.setExpanded(!expanded)
          }
          activeOpacity={0.5}>
          {titleComponent}
          <TouchableOpacity
            style={[styles.arrowView, arrowStyle]}
            onPress={
              typeof onArrowPress === 'function'
                ? onArrowPress
                : () => this.setExpanded(!expanded)
            }>
            {arrowComponent ? (
              arrowComponent
            ) : expanded ? (
              <Image
                source={require('../../assets/icons/arrow_up.png')}
                style={styles.arrow}
              />
            ) : (
              <Image
                source={require('../../assets/icons/arrow_down.png')}
                style={styles.arrow}
              />
            )}
          </TouchableOpacity>
        </TouchableOpacity>
        {expanded && (
          <View style={[styles.children, childrenStyle]}>{children}</View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  header: {
    paddingVertical: 8,
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  arrowView: {
    position: 'absolute',
    right: 8,
    top: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  children: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  arrow: {
    maxWidth: 12,
    resizeMode: 'contain',
  },
});

export default AccordionItem;
