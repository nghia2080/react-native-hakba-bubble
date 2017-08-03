/**
 * react-native-message-bubble
 * https://github.com/pop-xiaodong/react-native-message-bubble
 */

'use strict';

var React = require('react');
var {
  Animated,
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  Dimensions,
} = require('react-native');
import StoryText from '../../../src/components/StoryText';
var window = Dimensions.get('window');
var BubbleView = require('./bubbleView');
import DeviceInfo from 'react-native-device-info';
import {CachedImage} from "react-native-img-cache";
var messageFontSize = DeviceInfo.isTablet() ? 30 : 18;
var senderNameFontSize = DeviceInfo.isTablet() ? 24 : 14;
const screenWidth = Dimensions.get('window').width;
var BubbleText = React.createClass({

  getInitialState() {
    return {
      viewHeight: null,
      viewWidth: window.width/3*2,
      opacity: 0,
      fadeAnim: new Animated.Value(0)
    }
  },

  componentDidMount() {
    if (this.props.shouldFade) {
      Animated.timing(                            // Animate over time
        this.state.fadeAnim,                      // The animated value to drive
        {
          toValue: 1,
          duration: 0,                           // Animate to opacity: 1, or fully opaque
          useNativeDriver: true
        }
      ).start();
    } else {
      this.state.fadeAnim = new Animated.Value(1);
    }
    // Starts the animation
  },

  render() {
    var {viewHeight, viewWidth, opacity} = this.state;
    var {messageType, messages, senderName, shouldFade} = this.props;
    if (messageType == "right") {
      return (
        <Animated.View style = {{opacity: this.state.fadeAnim}}>
        <View style={styles.rowRight}>
          <View
            onLayout={(e) => {
              this.rightText.measure((a, b, width, height, px, py) =>{
                if (width != viewWidth || height != viewHeight) {
                  this.setState({
                    viewHeight: height,
                    viewWidth: width,
                    opacity: 1,
                  });
                }
              });
            }}
            style={{width: viewWidth, height: viewHeight, backgroundColor: '#b6e858', borderRadius: 2,marginRight: 3,opacity:opacity}}
            >
            <Text
              ref={v => this.rightText = v}
              style={styles.messagesRight}>{messages}</Text>
          </View>
        </View>
        <View style={styles.rowRight}>
          <Text style={styles.senderNameRight}>{senderName}</Text>
        </View>
        </Animated.View>
      )
    } else if (messageType == "left") {
      return (
        <Animated.View style = {{opacity: this.state.fadeAnim}}>
        <View style={styles.rowLeft}>
          <View
            onLayout={(e) => {
              this.leftText.measure((a, b, width, height, px, py) =>{
                if (width != viewWidth || height != viewHeight) {
                  this.setState({
                    viewHeight: height,
                    viewWidth: width,
                    opacity: 1,
                  });
                }
              });
            }}
            style={{width: viewWidth+ 15,maxWidth:screenWidth-15, height: viewHeight, backgroundColor: 'white', borderRadius: 2,marginLeft: 3,opacity:opacity}}
            >
            <Text
              ref={v => this.leftText = v}
              style={styles.messagesLeft}>{messages}</Text>
          </View>
        </View>
        <View style={styles.rowLeft}>
          <Text style={styles.senderNameLeft}>{senderName}</Text>
        </View>
        </Animated.View>
      )
    } else if (!messageType && senderName) {
      // long center messages
      return (
        <Animated.View style = {{opacity: this.state.fadeAnim}}>
          <View style={styles.rowCenter}>
            <View
              onLayout={(e) => {
                this.CenterText.measure((a, b, width, height, px, py) =>{
                  if (width != viewWidth || height != viewHeight) {
                    this.setState({
                      viewHeight: height,
                      viewWidth: width,
                      opacity: 1,
                    });
                  }
                });
              }}
              style={{width: screenWidth-15, height: viewHeight, opacity: opacity,backgroundColor:'red'}}
              >
            <Text
              ref={v => this.CenterText = v}
              numberOfLines={0}
              style={styles.messagesRight}>{messages}</Text>
            </View>
          </View>
          <View style={styles.rowRight}>
            <Text style={styles.senderNameRight}>{senderName}</Text>
          </View>
        </Animated.View>
      )
    } else {
      // center messages
      return (
        <Animated.View style = {{opacity: this.state.fadeAnim}}>
          <View style={styles.rowCenter}>
            <View
              onLayout={(e) => {
                this.CenterText.measure((a, b, width, height, px, py) =>{
                  if (width != viewWidth || height != viewHeight) {
                    this.setState({
                      viewHeight: height,
                      viewWidth: width,
                      opacity: 1,
                    });
                  }
                });
              }}
              style={{ justifyContent: 'center',maxWidth:screenWidth-15, width: viewWidth + 15, height: viewHeight, opacity: opacity,backgroundColor:'red', borderRadius: 5}}
              >
            <Text
              ref={v => this.CenterText = v}
              style={styles.messagesCenter}>{messages}</Text>
            </View>
          </View>
          <View style={styles.rowLeft}>
            <Text style={styles.senderNameLeft}>{senderName}</Text>
          </View>
        </Animated.View>
      )
    }
  }
});

var styles = StyleSheet.create({
  rowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rowLeft: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  messagesRight: {
    alignSelf: 'flex-end',
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 2,
    paddingLeft: 2,
    backgroundColor: 'transparent',
    fontSize: messageFontSize,
  },
  messagesLeft: {
    alignSelf: 'flex-start',
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: 'transparent',
    fontSize: messageFontSize,
  },
  messagesCenter: {
    alignSelf: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: 'transparent',
    fontSize: messageFontSize,
  },
  userImage: {
    marginTop: 2,
    height: 35,
    width: 35,
  },
  senderNameLeft: {
    fontSize: senderNameFontSize,
    alignSelf: 'flex-start',
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 8,
    backgroundColor: 'transparent',
    color: '#fff000',
  },
  senderNameRight: {
    fontSize: senderNameFontSize,
    alignSelf: 'flex-end',
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 8,
    backgroundColor: 'transparent',
    color: '#fff000',
  },
});

module.exports = BubbleText;
